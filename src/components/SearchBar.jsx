import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px; /* Adjust margin to control vertical position */
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f3f5;
  border-radius: 25px;
  padding: 5px 10px;
  width: 300px;
  border: 1px solid #ced4da;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 8px;
  font-size: 16px;
  color: #495057;
`;

export const SearchIcon = styled(FaSearch)`
  color: #495057;
  margin-right: 8px;
  font-size: 18px;
  cursor: pointer;
`;

const SearchBar = ({ onSearch, theme, toggleTheme }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <SearchBarWrapper>
      <SearchBarContainer>
        <SearchIcon onClick={handleSearch} />
        <SearchInput
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search for a location..."
        />
      </SearchBarContainer>
      
    </SearchBarWrapper>
  );
};

export default SearchBar;
