import { useEffect, useState } from 'react'
import axios from 'axios';

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
  return(
    <>
      <div>
        <h1>Weather in {props.weatherData.name}</h1>
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
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {setCountry(response.data)})
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      console.log("Latitude:", latitude,  "longitude:", longitude);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if(latitude && longitude){
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={API-KEY}`)
      .then(response => (console.log(response.data)))
    }
  }, [longitude, latitude]);


  const findCountry = (e) => {
    const foundCountry = e.target.value.trim().toLowerCase();
    
    var found = country.filter(c =>
      c.name.common.toLowerCase().includes(foundCountry)
    )

    if (e.target.value.trim() === "") {
      setErrorMessage(" ");
      setFoundCountries([]);
    } else if (found.length > 10) {
      setErrorMessage("Too many matches, specify another filter");
      setFoundCountries([]);
    } else {
      setErrorMessage("");
      setFoundCountries(found);
    }
    

    if(found.length === 1){
      setCountryInfo(found)
      setFoundCountries([])
    } else{
      setCountryInfo([])
    }


  }

  const setActiveCountry = (selectedCountry) => {
    setCountryInfo([selectedCountry])
    setLatitude(selectedCountry.latlng[0]);
    setLongitude(selectedCountry.latlng[1]); 
    if(selectedCountry){
      setFoundCountries([])
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
      <WeatherData weatherData={weatherData.name}/>
    </>
  )
}

export default App
