import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

const HeaderContainer = styled.header`
  font-family: 'Merriweather', serif;
  color: white;
  padding: 10px;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center; 
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

const Header = ({ onSaveLocation, location, theme, toggleTheme }) => {
  return (
    <HeaderContainer>
      <Title>Weather App</Title>
      <ButtonContainer>
        <Button onClick={onSaveLocation}>Save Location</Button>
        <Link to="/saved-locations">
          <Button>View Saved Locations</Button>
        </Link>
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
