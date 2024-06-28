import { API_URL_withoutCityIds } from "./APIHelper";

export const fetchWeatherData = async (cityIds) => {
  const idString = cityIds.join(',');
  try {
    const response = await fetch(`${API_URL_withoutCityIds}&id=${idString}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Re-throw the error to propagate it to the caller
  }
  
};


