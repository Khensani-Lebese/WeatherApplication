// src/utils/localStorage.js
export const saveLocation = (location) => {
    const savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];
    if (!savedLocations.includes(location)) {
      savedLocations.push(location);
      localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
    }
  };
  
  export const getSavedLocations = () => {
    return JSON.parse(localStorage.getItem('savedLocations')) || [];
  };
  
  export const removeLocation = (location) => {
    let savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];
    savedLocations = savedLocations.filter((loc) => loc !== location);
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  };
  