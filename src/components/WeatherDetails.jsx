// src/components/WeatherDetails.js
import React from 'react';
import styled from 'styled-components';

const WeatherDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Detail = styled.p`
  margin: 5px 0;
`;


const WeatherDetails = ({ humidity, windSpeed, feelsLike, visibility }) => {
  return (
    <WeatherDetailsContainer>
      <Detail>Humidity: {humidity}%</Detail>
      <Detail>Wind Speed: {windSpeed} km/h</Detail>
      <Detail>Feels Like: {feelsLike}°</Detail>
      <Detail>Visibility: {visibility} km</Detail>
      </WeatherDetailsContainer>
  );
};

export default WeatherDetails;
