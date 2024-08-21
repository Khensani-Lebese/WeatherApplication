// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './components/GlobalStyles';
import HomePage from './pages/HomePage';
import SavedLocationsPage from './pages/SavedLocationsPage';
import ThemeSwitcher from './components/ThemeSwitcher';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved-locations" element={<SavedLocationsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
