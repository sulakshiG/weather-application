# Weather Application

A web application with a simple user interface to display the latest weather information of selected set of cities in the world from a Weather API.
This particular application will use codes representing real world cities, which then are extracted from the provided JSON file, as reference to call [openweathermap.org](https://openweathermap.org/) to get the relevant weather information.

## Used Technologies 
- Back End Development:
  - Java
  - SpringBoot
    
- Front End Development:
  - HTML
  - CSS
  - React

## Project Structure
This project consists of two separate folders containing the backend and the frontend respectively.
- [Back End - weather-api](https://github.com/sulakshiG/weather-application/tree/main/weather-api)
   - [`HELP.md`](https://github.com/sulakshiG/weather-application/blob/main/weather-api/HELP.md): contains documentation files related to the backend
  
- [Front End - weather-app](https://github.com/sulakshiG/weather-application/tree/main/weather-app)
   - [`README.md`](https://github.com/sulakshiG/weather-application/blob/main/weather-app/README.md): contains documentation files related to the frontend

## SetUp and Execution
1. Clone the repository or download the source code
```
https://github.com/sulakshiG/weather-application.git
```

2. Direct to the project folder.

3. Firstly, the Backend code `weather-api` has to be executed either using an appropriate IDE or Command Line Interface if Maven build tool is already installed in the computer.

    - If you want access weather API using your own API key, you need to register with [openweathermap.org](https://openweathermap.org/) to get your own API key.
    - Then you need to copy your own unique API key and update [`application.properties`](https://github.com/sulakshiG/weather-application/blob/main/weather-api/src/main/resources/application.properties) file as follows.

      ```
      weather.appId='YOUR_API_KEY'
      ```

5. After that, the Frontend code has to be executed.
   To run the React App, direct to `weather-app` folder in the terminal and type `npm start`



    
