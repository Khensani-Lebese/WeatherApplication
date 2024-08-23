// src/components/TemperatureToggle.js
import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 0 5px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;




const TemperatureToggle = ({ unit, toggleUnit }) => {
  return (
    <ToggleContainer>
    <Button onClick={toggleUnit}>
      {unit === 'C' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
    </Button>
    </ToggleContainer>
  );
};

export default TemperatureToggle;
