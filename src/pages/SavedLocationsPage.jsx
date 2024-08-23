import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedLocations, removeLocation } from '../utils/localStorage';
import { getCurrentWeather, getForecast } from '../services/WeatherService';
import WeatherOverview from '../components/WeatherOverview';
import WeatherDetails from '../components/WeatherDetails';
import Forecast from '../components/Forecast';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  font-family: 'Merriweather', serif;
  color: white;
  padding: 10px;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SavedLocationsContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const LocationCard = styled.div`
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LocationName = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const LocationButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const RemoveButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: #dc3545;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const BackButton = styled.button`
  padding: 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const SavedLocationsPage = () => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const locations = getSavedLocations();
    console.log("Retrieved saved locations:", locations);
    setSavedLocations(locations);
  }, []);

  const handleLocationClick = async (location) => {
    setSelectedLocation(location);
    try {
      const currentWeather = await getCurrentWeather(location);
      const forecast = await getForecast(location);
      setWeatherData({
        ...currentWeather,
        forecast: forecast.forecast,
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

  const handleBackClick = () => {
    navigate('/');  // Navigate back to the homepage
  };

  return (
    <div>
      <HeaderContainer>
        <h2>Saved Locations</h2>
        <BackButton onClick={handleBackClick}>Back to Home</BackButton>
      </HeaderContainer>
      <SavedLocationsContainer>
        {savedLocations.length === 0 ? (
          <p>No locations saved yet.</p>
        ) : (
          savedLocations.map((location, index) => (
            <LocationCard key={index}>
              <LocationName>{location}</LocationName>
              <ButtonContainer>
                <LocationButton onClick={() => handleLocationClick(location)}>
                  View Location
                </LocationButton>
                <RemoveButton onClick={() => handleRemoveLocation(location)}>
                  Remove
                </RemoveButton>
              </ButtonContainer>
            </LocationCard>
          ))
        )}
      </SavedLocationsContainer>
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
