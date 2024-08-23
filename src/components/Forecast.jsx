// src/components/Forecast.js
import React from 'react';
import styled from 'styled-components';

const ForecastContainer = styled.div`
  margin: 20px;
`;

const ForecastSection = styled.div`
  margin-bottom: 20px;
`;

const ForecastHeader = styled.h3`
  margin-bottom: 15px;
  font-size: 18px;
  color: #007bff;
  text-align: center;
`;

const ForecastItems = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
`;

const ForecastItem = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForecastDetail = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

const Forecast = ({ hourly, daily, unit }) => {
  const convertTemperature = (temp) => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };

  return (
    <ForecastContainer>
      <ForecastSection>
        <ForecastHeader>Hourly Forecast</ForecastHeader>
        <ForecastItems>
          {hourly && hourly.map((hour, index) => (
            <ForecastItem key={index}>
              <ForecastDetail>{hour.time}</ForecastDetail>
              <ForecastDetail>Temperature: {convertTemperature(hour.temp_c)}°{unit}</ForecastDetail>
              <ForecastDetail>Condition: {hour.condition.text}</ForecastDetail>
            </ForecastItem>
          ))}
        </ForecastItems>
      </ForecastSection>
      <ForecastSection>
        <ForecastHeader>Daily Forecast</ForecastHeader>
        <ForecastItems>
          {daily && daily.map((day, index) => (
            <ForecastItem key={index}>
              <ForecastDetail>Date: {day.date}</ForecastDetail>
              <ForecastDetail>Max Temp: {convertTemperature(day.day.maxtemp_c)}°{unit}</ForecastDetail>
              <ForecastDetail>Min Temp: {convertTemperature(day.day.mintemp_c)}°{unit}</ForecastDetail>
              <ForecastDetail>Condition: {day.day.condition.text}</ForecastDetail>
            </ForecastItem>
          ))}
        </ForecastItems>
      </ForecastSection>
    </ForecastContainer>
  );
};

export default Forecast;
