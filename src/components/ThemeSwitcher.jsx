import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px;
  margin-left: 10px; /* Space between search bar and theme switcher */
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </Button>
  );
};

export default ThemeSwitcher;
