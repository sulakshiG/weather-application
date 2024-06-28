
const GET_API_Method = 'https://api.openweathermap.org/data/2.5/group';
const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

export const API_URL_withoutCityIds = `${GET_API_Method}?units=metric&appid=${apiKey}`;