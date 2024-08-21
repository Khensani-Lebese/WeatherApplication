// src/components/WeatherOverview.js
import React from 'react';

const WeatherOverview = ({ location, temperature, condition }) => {
  return (
    <div>
      <h2>{location}</h2>
      <p>{temperature}°</p>
      <p>{condition}</p>
    </div>
  );
};

export default WeatherOverview;
