import React, { useState, useEffect } from "react";
import "./weather.css";

const Weather = () => {
  const savedCity = JSON.parse(localStorage.getItem("selectedCity"));
  const [city, setCity] = useState(savedCity?.name || "New York"); // Default city
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [coords, setCoords] = useState({
    latitude: savedCity?.lat || 40.7128,
    longitude: savedCity?.lon || -74.006,
  });
  //const API_KEY = localStorage.getItem("weatherApiKey") || "";
  const API_KEY = "";

  //const dt = {"coord":{"lon":-74.006,"lat":40.7128},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":14.61,"feels_like":13.04,"temp_min":13.32,"temp_max":16.01,"pressure":1022,"humidity":35,"sea_level":1022,"grnd_level":1021},"visibility":10000,"wind":{"speed":3.6,"deg":270},"clouds":{"all":0},"dt":1743177741,"sys":{"type":2,"id":2037026,"country":"US","sunrise":1743158740,"sunset":1743203766},"timezone":-
 // 400,"id":5128581,"name":"New York","cod":200}

  console.log("hello0");
  // Fetch city suggestions
  const fetchCitySuggestions = async (query) => {
    console.log("hello2");
    console.log(query);
    if (!query || city === "New York") return;
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    if (data.length > 0) {
      // Map it to match your current code expectations
      const formattedSuggestions = data.map((item, index) => ({
        id: index, // OpenWeather geocode API doesn't return id, so just use index
        name: item.name,
        country: item.country,
        latitude: item.lat,
        longitude: item.lon,
      }));

      setSuggestions(formattedSuggestions);
    }
  };

  // Fetch weather data
  const fetchWeather = async (
    latitude = coords.latitude,
    longitude = coords.longitude
  ) => {
    //setWeatherData(dt);
    console.log("hello4");
    if (!API_KEY) return;
    console.log("hello5");
    console.log(API_KEY);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log("Flag2");
    console.log(data);
    setWeatherData(data);
  };

  //setWeatherData(dt);

  useEffect(() => {
    /*     if (city === "New York") {
      fetchWeather(40.7128, -74.006); // Coordinates for New York
      
    } */
    fetchWeather(40.7128, -74.006); // Coordinates for New York
    const interval = setInterval(() => {
      fetchWeather(coords.lat, coords.lon);
    }, 600 * 1000); // 5 minutes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [coords]);

  const handleCitySelect = (selectedCity) => {
    if (city.toLowerCase() !== selectedCity.name.toLowerCase()) {
      setCity(selectedCity.name);
    }
    setSuggestions([]);
    setCoords({
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
    }); // ← NEW
    fetchWeather(selectedCity.latitude, selectedCity.longitude);

    localStorage.setItem(
      "selectedCity",
      JSON.stringify({
        name: selectedCity.name,
        lat: selectedCity.latitude,
        lon: selectedCity.longitude,
      })
    );
  };

  useEffect(() => {
    if (city && city !== "New York") {
      fetchCitySuggestions(city);
    }
  }, [city]);

  return (
    <div className="weather-container">
      <div className="location-input">
        <label htmlFor="city-input">Enter City:</label>
        <input
          id="city-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          list={city !== "" ? "city-suggestions" : undefined}
        />

        {city !== "" && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((s) => (
              <li key={s.id} onClick={() => handleCitySelect(s)}>
                {s.name}, {s.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="weather-displays">
        {/* Default Weather Display for New York */}
        {city === "" && weatherData && (
          <div className="weather-display">
            <h2>New York</h2>
            <p className="temperature">{weatherData.main.temp}°C</p>
            <p className="weather-info-line">
              <span style={{ paddingRight: "10px" }}>
                FL: {weatherData.main.feels_like}°C
              </span>
              <span style={{ paddingRight: "10px" }}>
                WS: {weatherData.wind.speed} m/s
              </span>
              <p>SKY: {weatherData.weather[0].description}</p>
            </p>
          </div>
        )}

        {/* User-selected weather */}
        {city !== "" && weatherData && (
          <div className="weather-display">
            <h2>{city}</h2>
            <p className="temperature">{weatherData.main.temp}°C</p>
            <p className="weather-info-line">
              <span style={{ paddingRight: "10px" }}>
                FL: {weatherData.main.feels_like}°C
              </span>
              <span style={{ paddingRight: "10px" }}>
                WS: {weatherData.wind.speed} m/s
              </span>
              <span>SKY: {weatherData.weather[0].description}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
