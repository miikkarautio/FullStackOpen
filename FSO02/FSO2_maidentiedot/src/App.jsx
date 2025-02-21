import { useEffect, useState } from 'react'
import axios from 'axios';

const CountryInformation = (props) => {


  return(
    <>
      {props.countryInfo.map((information) =>
        <p key={information.cca3}>
          <h1>{information.name.common}</h1>
          Capital: {information.capital} <br/>
          Area: {information.area} <br/>
          <h2>Languages</h2>
          <ul>
            {Object.values(information.languages).map((language, index) =>(
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={information.flags.png} alt="Image of the countries flag" />
          </p> 
          
      )}
      
    </>
  )
}

function App() {
  const [country, setCountry] = useState({})
  const [foundCountries, setFoundCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [countryInfo, setCountryInfo] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {setCountry(response.data)})
  }, []);

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

    console.log(foundCountries)
  }

  return (
    <>
      <p>Find countries <input type="text" id="country" onChange={findCountry} /></p>
      {errorMessage && <p>{errorMessage}</p>}
      {foundCountries.map((country) =>
        <p key={country.cca3}>{country.name.common}</p>
      )}
      <CountryInformation countryInfo={countryInfo} />
    </>
  )
}

export default App
