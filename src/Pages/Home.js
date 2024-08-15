import styles from "./styles.module.css";
import LeftBar from "../Components/LeftBar/LeftBar";
import RightBar from "../Components/RightBar/RightBar";
import SearchBar from "../Components/SearchBar/SearchBar";
import Loading from "./Loading";
import { useState, useEffect } from "react";

const API_KEY = 'f1b963cd4b164abd86b170123241508'; // Replace with your actual API key

const getPlaceByLatitudeAndLongitude = async (lat, lon) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${lat},${lon}`);
    if (!response.ok) {
      throw new Error('Failed to fetch place');
    }
    const data = await response.json();
    return data[0]?.name || 'Unknown location';
  } catch (error) {
    console.error('Error fetching place:', error);
    return 'Unknown location';
  }
};

const getWeatherReport = async (place) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${place}&days=3&aqi=yes&alerts=no`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather report');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather report:', error);
    return null;
  }
};

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(false);

  const handleThemeChange = () => setMode(mode === "dark" ? "light" : "dark");

  const fetchWeather = async (place) => {
    if (place) {
      setLoading(true);
      const data = await getWeatherReport(place);
      if (data?.error) {
        console.log("Place does not exist. Defaulting to London.");
        const defaultData = await getWeatherReport("London");
        setWeather(defaultData);
      } else {
        setWeather(data);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchWeatherForCurrentLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const place = await getPlaceByLatitudeAndLongitude(latitude, longitude);
            await fetchWeather(place);
          },
          async (error) => {
            console.error("Error getting geolocation:", error);
            await fetchWeather("London");
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        await fetchWeather("London");
      }
    };

    fetchWeatherForCurrentLocation();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <LeftBar weather={weather} mode={mode}>
        <SearchBar
          fetchWeather={fetchWeather}
          handleThemeChange={handleThemeChange}
          mode={mode}
        />
      </LeftBar>
      <RightBar weather={weather} mode={mode} />
    </div>
  );
};

export default Home;
