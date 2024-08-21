// src/pages/SavedLocationsPage.js
import React, { useState, useEffect } from 'react';
import { getSavedLocations, removeLocation } from '../utils/localStorage';
import { getCurrentWeather, getForecast } from '../services/WeatherService'; // Import correct functions
import WeatherOverview from '../components/WeatherOverview';
import WeatherDetails from '../components/WeatherDetails';
import Forecast from '../components/Forecast';

const SavedLocationsPage = () => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const locations = getSavedLocations();
    console.log("Retrieved saved locations:", locations); // Debugging log
    setSavedLocations(locations);
  }, []);

  const handleLocationClick = async (location) => {
    setSelectedLocation(location);
    try {
      const currentWeather = await getCurrentWeather(location);
      const forecast = await getForecast(location);
      setWeatherData({
        ...currentWeather,
        forecast: forecast.forecast, // Assuming forecast data is under 'forecast' key
      });
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  };

  const handleRemoveLocation = (location) => {
    removeLocation(location);
    const updatedLocations = getSavedLocations();
    setSavedLocations(updatedLocations);
    if (location === selectedLocation) {
      setSelectedLocation(null);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h2>Saved Locations</h2>
      {savedLocations.length === 0 ? (
        <p>No locations saved yet.</p>
      ) : (
        <ul>
          {savedLocations.map((location, index) => (
            <li key={index}>
              <button onClick={() => handleLocationClick(location)}>
                {location}
              </button>
              <button onClick={() => handleRemoveLocation(location)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {weatherData && (
        <>
          <WeatherOverview
            location={weatherData.location.name}
            temperature={weatherData.current.temp_c}
            condition={weatherData.current.condition.text}
          />
          <WeatherDetails
            humidity={weatherData.current.humidity}
            windSpeed={weatherData.current.wind_kph}
            feelsLike={weatherData.current.feelslike_c}
            visibility={weatherData.current.vis_km}
          />
          <Forecast
            hourly={weatherData.forecast.forecastday[0].hour}
            daily={weatherData.forecast.forecastday}
          />
        </>
      )}
    </div>
  );
};

export default SavedLocationsPage;
