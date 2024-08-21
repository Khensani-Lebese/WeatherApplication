// src/components/ThemeSwitcher.js
import React from 'react';
import styled from 'styled-components';

const Switcher = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  return (
    <Switcher onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </Switcher>
  );
};

export default ThemeSwitcher;
