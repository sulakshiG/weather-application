import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allCityCodes } from "../CardsContainer/CardsContainer.js";
import { fetchWeatherData } from "../../utils/APIHandler.js";
import { getCachedData, setCachedData, isExpired } from "../../utils/LocalStorageHandler";
import { CACHE_DURATION } from "../../utils/LocalStorageHandler";
import { TemplateEnlargedCard } from "../Template/Template.js";

function EnlargedCard() {
    const { cityCode } = useParams();
    const [cityWeatherData, setCityWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(getCachedData())
    console.log('Current Time:'+Date.now())
    // const cachedData = getCachedData();
    // console.log(cachedData.data.find((city) => (city.id === parseInt(cityCode))));

    useEffect(() => {
        const loadCityWeatherData = async () => {
            try {
                // const getCachedCityData = () => {
                //     const cachedData = getCachedData();
                //     const cityWeatherData = cachedData.data.find((city) => city.id === parseInt(cityCode));
                //     setCityWeatherData(cityWeatherData);
                // }
                const cachedData = getCachedData();

                // if (getCachedData() && !isExpired(getCachedData().expiration)) {
                //     // getCachedCityData();
                //     const cityWeatherData = cachedData.data.find((city) => city.id === parseInt(cityCode));
                //     setCityWeatherData(cityWeatherData);
                //     if (cityWeatherData) {
                //         setCityWeatherData(cityWeatherData);
                //     } else {
                //         setError("City weather data not found in cache.");
                //     }
                    
                // }
                // else {
                //     const data = await fetchWeatherData(allCityCodes);
                //     const dataWithTimestamp = data.list.map(city => ({
                //     ...city,
                //     timestamp: Date.now(),
                //     }));
                //     setCachedData({ data: dataWithTimestamp, expiration: Date.now() + CACHE_DURATION });
                //     // getCachedCityData();
                //     const cachedData = getCachedData();
                //     const cityWeatherData = cachedData.data.find((city) => city.id === parseInt(cityCode));
                //     setCityWeatherData(cityWeatherData);
                //     if (cityWeatherData) {
                //         setCityWeatherData(cityWeatherData);
                //     } else {
                //         setError("City weather data not found in the fetched data.");
                //     }
                    
                // }

                if (!(cachedData && !isExpired(cachedData.expiration))) {
                    const data = await fetchWeatherData(allCityCodes);
                    const dataWithTimestamp = data.list.map(city => ({
                    ...city,
                    timestamp: Date.now(),
                    }));
                    setCachedData({ data: dataWithTimestamp, expiration: Date.now() + CACHE_DURATION });
                    // getCachedCityData();
                    const cachedData = getCachedData();
                    const cityWeatherData = cachedData.data.find((city) => city.id === parseInt(cityCode));
                    setCityWeatherData(cityWeatherData);
                    if (cityWeatherData) {
                        setCityWeatherData(cityWeatherData);
                    } else {
                        setError("City weather data not found in the fetched data.");
                    }

                    
                }
                else {
                    
                    // getCachedCityData();
                    const cityWeatherData = cachedData.data.find((city) => city.id === parseInt(cityCode));
                    setCityWeatherData(cityWeatherData);
                    if (cityWeatherData) {
                        setCityWeatherData(cityWeatherData);
                    } else {
                        setError("City weather data not found in cache.");
                    }
                    
                }

            } 
            catch (error) {
                setError("An error occurred while loading city weather data.");
                console.error(error);
            }
            finally {
                setLoading(false);
            }
            // const cachedData = getCachedData();
            // const cachedDataArray = cachedData.data
            // console.log(cachedData)
            // console.log(cachedDataArray[0].id)
            // let city = 0;
            // for( let i = 0; i < cachedDataArray.length; i++ ){
            //     if( cachedDataArray[i].id == cityCode){
            //         city = i;
            //         break;
            //     }
            // }
            // console.log(cachedDataArray[city].id)
            // const weatherData = cachedDataArray[city]
            // console.log(weatherData)
            // if (weatherData) {
            //   setWeatherData(weatherData);
            // } else {
            //   console.log("City weather data not found in cache");
            // }

        };
        if (cityCode) {
            setLoading(true); // Set loading to true when starting the data fetch
            loadCityWeatherData();
        }

    }, [cityCode]);

    console.log(cityCode);
    console.log(cityWeatherData); 

    if (!cityWeatherData) {
        return <div>Please refresh the page.</div>;
    }

    return cityCode && cityWeatherData ? (
        <div>
            <center>
            {loading && <center>Loading...</center>}
            {error && <center>Error: {error}</center>}
            
                <TemplateEnlargedCard data={cityWeatherData}/>
            </center>
        </div>
    ) 
    : (
        <div>Please Refresh the Page</div>)
    ;
}

export default EnlargedCard;
