import WeatherAppLogo from '../../assets/WeatherApp_Logo_Title.png'
import './Header.css'

const Header = () => {
    return ( 
        <div className="header--container">
            <header className='header'>
                <img 
                src={WeatherAppLogo} 
                alt="Weather App Logo and Title" 
                className='header--logo&Title'/>
            </header>
        </div> 
     );
}

  
export default Header;