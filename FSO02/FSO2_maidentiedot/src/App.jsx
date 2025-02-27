import { useEffect, useState } from 'react'
import axios from 'axios';
import countryService from './services/countries'
import weatherService from './services/weather'

const CountryInformation = (props) => {
  return(
    <>
      {props.countryInfo.map((information) =>
        <div key={information.cca3}>
          <h1>{information.name.common}</h1>
          <p>Capital: {information.capital}</p> 
          <p>Area: {information.area}</p> 
          <h2>Languages</h2>
          <ul>
            {Object.values(information.languages).map((language, index) =>(
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={information.flags.png} alt="Image of the countries flag" />
          </div> 
          
      )}
      
    </>
  )
}

const CountrySearch = (props) => {
  return(
    <>
      <p>Find countries <input type="text" id="country" onChange={props.findCountry} /></p>
      {props.errorMessage && <p>{props.errorMessage}</p>}
      {props.foundCountries.map((country) =>
        <p key={country.cca3}>{country.name.common}
        <button onClick={() => props.setActiveCountry(country)}>
          Show
        </button>
        </p>
      )}
    </>
  )
}

const WeatherData = (props) => {
  if (Object.keys(props.weatherData).length === 0) {
    return null;
  }

  return(
    <>
      <div>
        <h1>Weather in {props.weatherData.name}</h1>
        <p>Temperature {props.weatherData.main.temp}</p>
        <img src={`https://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`}/>
        <p>Wind {props.weatherData.wind.speed} m/s</p>
      </div>
    </>
  )
}


function App() {
  const [country, setCountry] = useState([])
  const [foundCountries, setFoundCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [countryInfo, setCountryInfo] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [longitude, setLongitude] = useState("")
  const [latitude, setLatitude] = useState("")


  useEffect(() => {
    countryService
      .getAll()
      .then(response => {setCountry(response.data)})
  })

  useEffect(() => {
    if(latitude && longitude){
      weatherService
        .getAll(latitude, longitude)
        .then(response =>{
          setWeatherData(response.data)
        })
    }
  }, [longitude, latitude])


  const findCountry = (e) => {
    const foundCountry = e.target.value.trim().toLowerCase();
    
    var found = country.filter(c =>
      c.name.common.toLowerCase().includes(foundCountry)
    )

    if (e.target.value.trim() === "") {
      setErrorMessage(" ");
      setFoundCountries([]);
      setWeatherData([])
    } else if (found.length > 10) {
      setErrorMessage("Too many matches, specify another filter");
      setFoundCountries([]);
      setWeatherData([])

    } else {
      setErrorMessage("");
      setFoundCountries(found);
    }
    

    if(found.length === 1){
      setCountryInfo(found)
      setLatitude(found[0].latlng[0])
      setLongitude(found[0].latlng[1])
      setFoundCountries([])

      setWeatherData([]);

      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${found[0].latlng[0]}&lon=${found[0].latlng[1]}&appid=${"API_KEY"}&units=metric`)
      .then(response => {
        setWeatherData(response.data)
      })
      .catch(error => {
        console.log("Error fetching weather data:", error);
        setWeatherData([])
      });

    } else{
      setCountryInfo([])
      setWeatherData([]);
    }


  }

  const setActiveCountry = (selectedCountry) => {
    
    setCountryInfo([selectedCountry]);

    setWeatherData([]);

    setLatitude(selectedCountry.latlng[0]);
    setLongitude(selectedCountry.latlng[1]); 

    if(selectedCountry){
      setFoundCountries([])
    }

    if(selectedCountry){
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCountry.latlng[0]}&lon=${selectedCountry.latlng[1]}&appid=${"API_KEY"}&units=metric`)
        .then(response => {
          setWeatherData(response.data)
        })
        .catch(error => {
          console.log("Error fetching weather data:", error);
          setWeatherData([])
        });
    }

  }
  
  return (
    <>
      <CountrySearch
      findCountry={findCountry}
      errorMessage={errorMessage}
      foundCountries={foundCountries}
      setActiveCountry={setActiveCountry}
      setLatitude={setLatitude}
      setLongitude={setLongitude}
      />
      <CountryInformation countryInfo={countryInfo}/>
      <WeatherData weatherData={weatherData}/>
    </>
  )
}

  export default App
