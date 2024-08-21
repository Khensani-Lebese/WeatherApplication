// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import WeatherOverview from '../components/WeatherOverview';
import WeatherDetails from '../components/WeatherDetails';
import Forecast from '../components/Forecast';
import TemperatureToggle from '../components/TemperatureToggle';
import { getCurrentWeather, getForecast } from '../services/WeatherService';
import { saveLocation } from '../utils/localStorage';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [location, setLocation] = useState('New York');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState('C');

  useEffect(() => {
    fetchWeatherData(location);
  }, [location, unit]);

  const fetchWeatherData = async (loc) => {
    try {
      const currentWeather = await getCurrentWeather(loc);
      const weatherForecast = await getForecast(loc);
      setWeather(currentWeather);
      setForecast(weatherForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = (query) => {
    setLocation(query);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (temp) => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };

  const handleSaveLocation = () => {
    saveLocation(location);
    alert(`Location ${location} saved successfully!`);
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <TemperatureToggle unit={unit} toggleUnit={toggleUnit} />
      <button onClick={handleSaveLocation}>Save Location</button>
      <Link to="/saved-locations">
        <button>View Saved Locations</button>
      </Link>
      {weather && (
        <WeatherOverview
          location={weather.location.name}
          temperature={convertTemperature(weather.current.temp_c)}
          condition={weather.current.condition.text}
        />
      )}
      {weather && (
        <WeatherDetails
          humidity={weather.current.humidity}
          windSpeed={weather.current.wind_kph}
          feelsLike={convertTemperature(weather.current.feelslike_c)}
          visibility={weather.current.vis_km}
        />
      )}
      {forecast && (
        <Forecast
          hourly={forecast.forecast.forecastday[0].hour}
          daily={forecast.forecast.forecastday}
          unit={unit}
        />
      )}
    </div>
  );
};

export default HomePage;
