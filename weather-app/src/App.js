import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Import CSS file for styling
import {RandomColor} from "./styles.js";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { TiLocationArrowOutline } from "react-icons/ti";
import { CiCloudOn } from "react-icons/ci";

// Function component for rendering an array of city objects
function RenderingArrayOfCityObjects() {
  
  // State to store the data fetched from the API
  const [data, setData] = useState([])

  // Fetching data from the API using useEffect hook
  useEffect(() => {
    const url = '/cities';

    axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  // Inline style for setting top division color
  const topDivisionColour = {
    backgroundColor: RandomColor()
  };

  // Mapping through the data array to render city cards
  const citylistItems = data.map((city) => {
      return (
        <div className="card">
          <div className="top-division" style={topDivisionColour}>
            <div className='top-leftDivision'> 
              <h2 className='city-name'>{city.cityName},{city.country}</h2>
              <p className='city-time'>{city.lastUpdatedTime} </p>
              <div className='weather-desc'>
                <CiCloudOn />
                <p className='weather-description'>{city.description}</p>
              </div>
            </div>

            <div className='top-rightDivision'>
              <div className='temp-content'>
                <h1 className='temp'>{city.temperature}°C</h1>
                <p className='temp-min'>Temp min:{city.minTemperature}°C</p>
                <p className='temp-max'>Temp max:{city.maxTemperature}°C</p>
              </div>
            </div>
          </div>

          <div className="bottom-division">
            <div className='bottom-content'>
              <div className="extra-details">
                <p className='pressure'>Pressure : 1018 hPa</p>
                <p className='humidity'>Humidity : 78%</p>
                <p className='visibility'>Visibility : 8.0 km</p>
              </div>
              <div className="wind">
                <div className='wind-content'>
                  <div className='wind-icon'>
                    <TiLocationArrowOutline />
                  </div>
                  <div>
                    <p className='wind-speed'>4.0 m/s 120 Degree</p>
                  </div>
                </div>
              </div>
              <div className="sun">
                <p className='sun-rise'>Sunrise : 6.09 am</p>
                <p className='sun-set'>Sunset : 6.12 pm</p>
              </div>
            </div>
          </div>
        </div> 
      );
  });
  
  // Returning the array of city cards
  return <div className="card-container">{citylistItems}</div>;
}

// Main App component
function App() {
  return (
    <div className="app">
      <Header/>
      <div className="search-bar">
        <input type="text" placeholder="Enter a city" />
        <button>Add City</button>
      </div>
      {/* Rendering the array of city objects */}
      <RenderingArrayOfCityObjects />
      <Footer/>
    </div>
  );
}

export default App;
