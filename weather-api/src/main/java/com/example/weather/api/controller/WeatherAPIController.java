package com.example.weather.api.controller;

import com.example.weather.api.CacheEntry;
import com.example.weather.api.CityDataParser;
import com.example.weather.api.Utils;
import com.example.weather.api.model.CityWeatherData;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/weather")
public class WeatherAPIController {

    private ConcurrentHashMap<String, CacheEntry> requestCache;
    public WeatherAPIController() {
        requestCache = new ConcurrentHashMap<>();
    }

    @Autowired
    private CityDataParser cityDataParser; // Autowired instance of CityDataParser

    @Value("${weather.appId}")
    private String appId; // Value of weather.appId from properties file

    // Endpoint to get weather data of multiple cities
    @GetMapping("/cities")
    public ResponseEntity<List<CityWeatherData>> getCitiesWeatherData(HttpServletRequest request, @RequestParam(value = "ids", required = false) String ids) {
        String url = request.getRequestURL().toString();
        if (requestCache.containsKey(url)) {
            CacheEntry cacheEntry = requestCache.get(url);
            if ((System.currentTimeMillis() - cacheEntry.getTimestamp()) < 300000) {
                //cache hit
                return ResponseEntity.ok(cacheEntry.getWeatherData());
            }
        }
        String cityIds = "";
        // If ids parameter is provided, filter out invalid city ids
        if (ids != null) {
            String[] cityIdArr = ids.split(",");
            List<String> cityList = Arrays.asList(cityDataParser.getCityIds());
            for (String cityId : cityIdArr) {
                if (cityList.contains(cityId)) {
                    cityIds = cityIds.concat(cityId).concat(",");
                }
            }
        } else {
            // If no ids parameter provided, use all available city ids
            cityIds = String.join(",", cityDataParser.getCityIds());
        }

        // Creating a WebClient instance to make HTTP requests
        WebClient client = WebClient.create("https://api.openweathermap.org");

        // Fetching weather data from OpenWeatherMap API
        String response = client.get()
                .uri("/data/2.5/group?id={cityIds}&units=metric&APPID={appId}", cityIds, appId).accept(MediaType.APPLICATION_JSON)
                .retrieve().bodyToMono(String.class)
                .block();

        // Parsing the JSON response using Gson library
        Gson gson = new Gson();
        JsonObject responseJson = gson.fromJson(response, JsonObject.class);
        List<CityWeatherData> cityWeatherDataList = new ArrayList<>();
        if (responseJson != null) {
            // Extracting weather data for each city from the JSON response
            for (JsonElement jsonElement : responseJson.getAsJsonArray("list")) {
                CityWeatherData cityWeatherData = new CityWeatherData();
                JsonObject jsonObject = jsonElement.getAsJsonObject();
                // Setting weather data for each city
                cityWeatherData.setCountry(jsonObject.get("sys").getAsJsonObject().get("country").getAsString());
                cityWeatherData.setCityName(jsonObject.get("name").getAsString());
                cityWeatherData.setCityId(jsonObject.get("id").getAsString());
                cityWeatherData.setTemperature(jsonObject.get("main").getAsJsonObject().get("temp").getAsString());
                cityWeatherData.setMinTemperature(jsonObject.get("main").getAsJsonObject().get("temp_min").getAsString());
                cityWeatherData.setMaxTemperature(jsonObject.get("main").getAsJsonObject().get("temp_max").getAsString());
                cityWeatherData.setDescription(jsonObject.get("weather").getAsJsonArray().get(0).getAsJsonObject()
                        .get("description").getAsString());
                cityWeatherData.setLastUpdatedTime(Utils.convertTimestampToReadableDate(jsonObject.get("dt").getAsLong()));
                // Adding weather data of the city to the list
                cityWeatherDataList.add(cityWeatherData);
            }
        }
        requestCache.put(url, new CacheEntry(System.currentTimeMillis(), cityWeatherDataList));
        // Returning the weather data of all cities as ResponseEntity
        return ResponseEntity.ok(cityWeatherDataList);
    }

}