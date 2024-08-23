// src/components/WeatherOverview.js
import React from 'react';
import styled from 'styled-components';


const WeatherOverviewContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const Temperature = styled.h2`
  font-size: 2em;
  margin: 10px 0;
`;


const WeatherOverview = ({ location, temperature, condition }) => {
  return (
    <WeatherOverviewContainer>
      <h2>{location}</h2>
      <Temperature>{temperature}°</Temperature>
      <p>{condition}</p>
      </WeatherOverviewContainer>
  );
};

export default WeatherOverview;
