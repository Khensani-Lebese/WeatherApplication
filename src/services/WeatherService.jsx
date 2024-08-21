// src/services/WeatherService.js
import axios from 'axios';

const API_KEY = 'f1b963cd4b164abd86b170123241508';
const BASE_URL = 'http://api.weatherapi.com/v1';

const cacheWeatherData = (key, data) => {
  const cachedData = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(cachedData));
};

const getCachedWeatherData = (key, maxAge = 3600000) => { // Default max age is 1 hour
  const cached = JSON.parse(localStorage.getItem(key));
  if (cached && (Date.now() - cached.timestamp) < maxAge) {
    return cached.data;
  }
  return null;
};

export const getCurrentWeather = async (location) => {
  const cacheKey = `currentWeather-${location}`;
  const cachedData = getCachedWeatherData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: location,
      },
    });
    cacheWeatherData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getForecast = async (location, days = 7) => {
  const cacheKey = `forecast-${location}-${days}`;
  const cachedData = getCachedWeatherData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: days,
      },
    });
    cacheWeatherData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};
