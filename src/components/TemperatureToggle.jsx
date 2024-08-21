// src/components/TemperatureToggle.js
import React from 'react';

const TemperatureToggle = ({ unit, toggleUnit }) => {
  return (
    <button onClick={toggleUnit}>
      {unit === 'C' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
    </button>
  );
};

export default TemperatureToggle;
