import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  // API key for OpenWeatherMap
  let api_key = "950c9a53d53dba149b9f46e33acb9191";

  // State for the weather icon, initialized with a default icon
  const [wicon, setWicon] = useState(cloud_icon);

  // Function to handle the user's search for weather data
  const search = async () => {
    // Get the input element with the class "cityInput"
    const element = document.getElementsByClassName("cityInput");

    // Check if the input is empty, return if it is
    if (element[0].value === "") {
      return 0;
    }

    // Build the API URL for weather data based on the user's input
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    // Fetch weather data from the API
    let response = await fetch(url);
    let data = await response.json();

    // Get elements to display humidity, wind speed, temperature, and location
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    // Update the displayed weather information with fetched data
    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
    location[0].innerHTML = data.name;

    // Update the weather icon based on the weather condition
    if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon == "04d" || data.weather[0].icon == "04n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon == "09d" || data.weather[0].icon == "09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon == "10d" || data.weather[0].icon == "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  }

  return (
    <div className='container'>
      <div className="top-bar">
        {/* Input field for city search */}
        <input type="text" className="cityInput" placeholder='search'></input>
        <div className="search-icon" onClick={() => { search() }}>
          {/* Search icon */}
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        {/* Display weather icon */}
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">
        {/* Display temperature */}
        24c
      </div>
      <div className="weather-location">
        {/* Display location (e.g., London) */}
        London
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">
              {/* Display humidity percentage */}
              64%
            </div>
            <div className="text">
              {/* Display 'Humidity' label */}
              Humidity
            </div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">
              {/* Display wind speed */}
              18 km/h
            </div>
            <div className="text">
              {/* Display 'Wind Speed' label */}
              Wind Speed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
