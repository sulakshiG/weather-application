package com.example.weather.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

// This annotation indicates that this class is the main Spring Boot application class
@SpringBootApplication
public class WeatherApiApplication extends SpringBootServletInitializer {

	// The main method that starts the Spring Boot application
	public static void main(String[] args) {
		SpringApplication.run(WeatherApiApplication.class, args);
	}

}
