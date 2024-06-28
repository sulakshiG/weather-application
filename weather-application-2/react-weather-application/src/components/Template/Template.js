import {DateFormatter, TimeFormatter } from "../../utils/HelperFunctions.js";
import './Template.css';
import { Link } from '@mui/material';
import { Divider} from "@mui/material";
import { TiLocationArrowOutline } from "react-icons/ti";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import {useResponsiveStyles} from "../../utils/HelperFunctions.js";
import { getRandomPastelColor } from "../../utils/HelperFunctions.js";

const UpperTemplate1Header = () => {
    return (
        <div style={{display:"flex",flexDirection:"row",justifyContent: "flex-end", width:'98%' ,paddingTop:"0.5rem"}}>
            <CloseIcon />
        </div>
    )
}

const UpperTemplate2Header = () => {

    const navigate = useNavigate();
    const handleBackArrowClick = () => {
    navigate(`/`);
    }
    return(
        <div style={{display:"flex",flexDirection:"row",justifyContent: "flex-start", width:'98%',padding:"0.5rem"}}>
            <Link to={`/`} onClick={handleBackArrowClick} underline="none" color={"white"}>
                <ArrowBackIcon />
            </Link>
        </div>
    )
    
}
const CityAndTime = ({data} ) => {
     const {
        sys: { country },
        dt,
        name } = data;

    return (
        <div className="city-time-container">
            <h2>{name}, {country}</h2>
            <p>{TimeFormatter(dt)}, {DateFormatter(dt)}</p>
        </div>
    )
}

const Weather = ({ data, flexDirection }) => {

    const {
        weather: [{ description, icon }] } = data;

    return (
        <div className="weather-container" style={{ display: 'flex', flexDirection: flexDirection ,justifyContent: 'center'}}>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather-icon" />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p>{description}</p>
            </div>
        </div>
    );
};

const Temperature = ( {data} ) => {
     const {
        main: { temp, temp_min, temp_max } } = data;
     return (
        <div className="temperature-container">
            <h2>{`${Math.round(temp)}°C`}</h2>
            <p>{`Temp Min: ${Math.round(temp_min)}°C`}</p>
            <p>{`Temp Max: ${Math.round(temp_max)}°C`}</p>
        </div>
     )

}

const UpperTemplate1 = ( {data , size} ) => {

    // const styles = {
    //     padding: size === "enlarged" ? "1.5rem" : "0.5rem"
    // }

    const styles = useResponsiveStyles(size);
    const randomColor = { backgroundColor: getRandomPastelColor()};
    const combinedStyles = {...styles, ...randomColor}
    return (
        <div className="upperTemplate-1" style={combinedStyles}>
            <UpperTemplate1Header />
            <div className="upperTemplate-1-container">
                <div className="first-column">
                    <CityAndTime data={data} />
                    <Weather data={data} flexDirection='row'/>
                </div>
                <div className="second-column">
                    <Temperature data={data}/>
                </div>
            </div>
        </div>
      );
}

const UpperTemplate2 = ({data , size} ) => {

    // const styles = {
    //     width: size === "enlarged" ? '55vw' : '30vw',
    //     padding: size === "enlarged" ? "0.5rem" : ".5rem"
    // };
    const styles = useResponsiveStyles(size);
    const randomColor = { backgroundColor: getRandomPastelColor()};
    const combinedStyles = {...styles, ...randomColor}
    
 
    return (
        <div className="upperTemplate-2" style={combinedStyles}>
            <UpperTemplate2Header /> 
            <CityAndTime data={data} />
            <div className="upperTemplate-2-container">
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 , marginTop: '1rem'}}>
                    <Weather data={data} flexDirection='column'/>
                </div>
                <Divider orientation="vertical" variant="middle" flexItem 
                        style={{backgroundColor: '#f5faf7'}}/>
                <div style={{ flex: 1 }}>
                    <Temperature data={data} />
                </div>
            </div>


        </div>
    )
}


export const LowerTemplate = ( {data , size}) => {

    // const styles = {
    //     width: size === "enlarged" ? '55vw' : '30vw',
    //     padding: size === "enlarged" ? "1.5rem" : ".5rem"
    // };
    const styles = useResponsiveStyles(size);

    const {
        main: { pressure, humidity },
        visibility,
        wind: { speed, deg },
        sys: { sunrise, sunset }} = data;
    return ( 
        <div className="lowerTemplate" style={styles}>
            <div className="column-container">
                <div className="first-column">
                    <div className="pressure-humidity-visibilty">
                        <p><strong>Pressure:</strong> {pressure}hPa</p>
                        <p><strong>Humidity:</strong> {humidity}%</p>
                        <p><strong>Visibility:</strong> {(visibility / 1000).toFixed(1)}km</p>
                    </div>
                </div>
                <Divider orientation="vertical" variant="middle" flexItem 
                        style={{backgroundColor: '#63687e'}}/>
                <div className="second-column">
                    <div className="wind">
                        <TiLocationArrowOutline size={32} />
                        <p>{`${speed.toFixed(1)}m/s ${deg} Degree`}</p>
                    </div>
                </div>
                <Divider orientation="vertical" variant="middle" flexItem 
                        style={{backgroundColor: '#63687e'}}/>
                <div className="third-column">
                    <div className="sunrise-sunset">
                        <p><strong>Sunrise:</strong> {TimeFormatter(sunrise)}</p>
                        <p><strong>Sunset:</strong> {TimeFormatter(sunset)}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export const TemplateCard = ({data, size="normal"}) => {
      return(
        <div className="template-card-container">
            <div className="template-card">
                <center>
                <UpperTemplate1 data={data} size={size}/>
                <LowerTemplate data={data} size={size}/>
                </center>
                
            </div>
        </div>
      )
}

export const TemplateEnlargedCard = ({data, size='enlarged'}) => {
    return(
      <div className="template-enlarged-card">
        <center>
          <UpperTemplate2 data={data} size={size}/>
          <LowerTemplate data={data} size={size}/>
        </center>
      </div>
    );
}


