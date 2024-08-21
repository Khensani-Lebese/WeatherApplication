// src/components/Forecast.js
import React from 'react';

const Forecast = ({ hourly, daily, unit }) => {
  const convertTemperature = (temp) => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };

  return (
    <div>
      <h3>Hourly Forecast</h3>
      <div>
        {hourly && hourly.map((hour, index) => (
          <div key={index}>
            <p>{hour.time}</p>
            <p>Temperature: {convertTemperature(hour.temp_c)}°{unit}</p>
            <p>Condition: {hour.condition.text}</p>
          </div>
        ))}
      </div>
      <h3>Daily Forecast</h3>
      <div>
        {daily && daily.map((day, index) => (
          <div key={index}>
            <p>Date: {day.date}</p>
            <p>Max Temp: {convertTemperature(day.day.maxtemp_c)}°{unit}</p>
            <p>Min Temp: {convertTemperature(day.day.mintemp_c)}°{unit}</p>
            <p>Condition: {day.day.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
