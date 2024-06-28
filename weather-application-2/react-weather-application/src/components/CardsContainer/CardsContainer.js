import { useState, useEffect } from "react";
import cities from "../../assets/cities.json"
import { fetchWeatherData } from "../../utils/APIHandler";
import { getCachedData, setCachedData, isExpired } from "../../utils/LocalStorageHandler";
import Card from "../Card/Card.js"
import { CACHE_DURATION } from "../../utils/LocalStorageHandler";
import "./CardsContainer.css"

export const allCityCodes = cities.List.map(city => city.CityCode);

const CardsContainer = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(getCachedData())
    console.log('Current Time:'+Date.now())

    useEffect(() => {
      const loadWeatherData = async () => {
        try {
            const cachedData = getCachedData();
            if (cachedData && !isExpired(cachedData.expiration)) {
                setWeatherData(cachedData.data);}
            else {
                const data = await fetchWeatherData(allCityCodes);
                const dataWithTimestamp = data.list.map(city => ({
                ...city,
                timestamp: Date.now(),
                }));
                setWeatherData(dataWithTimestamp);
                setCachedData({ data: dataWithTimestamp, expiration: Date.now() + CACHE_DURATION });
              }
        } catch (error) {
            setError("An error occurred while loading weather data.");
            console.error(error);
        } finally {
            setLoading(false);
        }
      };
  
      loadWeatherData();
    }, []);
 
    return (
      <div> 
        {/* <center> */}
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {/* </center> */}
        <div className="cards-container">
          <div className="row">
            {weatherData && weatherData.map((weather, index) => (
              <div className="column" key={index}>
                <div className="card">
                  <Card id={weather.id} {...weather} />
                </div>
              </div>
            ))}
          </div>
        </div>
         
      </div>
    );
  };
  
  export default CardsContainer;