const CACHE_KEY = 'weatherData';
export const CACHE_DURATION = 5 * 60 * 1000; 

export const getCachedData = () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (!cachedData) {
    return null;
    }

  const { expirationTime, data } = JSON.parse(cachedData);
  if (Date.now() < expirationTime) {
    return data;
  } else {
    localStorage.removeItem(CACHE_KEY);
    console.log('Cached weather data is expired')
    return null;
  }
};

export const setCachedData = (data) => {
  const cachedData = {
    expirationTime: Date.now() + CACHE_DURATION,
    data,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
};

export const isExpired = (expirationTime) => {
  return !expirationTime || (expirationTime < Date.now());
};
