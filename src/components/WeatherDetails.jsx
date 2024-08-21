// src/components/WeatherDetails.js
import React from 'react';

const WeatherDetails = ({ humidity, windSpeed, feelsLike, visibility }) => {
  return (
    <div>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} km/h</p>
      <p>Feels Like: {feelsLike}°</p>
      <p>Visibility: {visibility} km</p>
    </div>
  );
};

export default WeatherDetails;
