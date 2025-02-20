import { useEffect, useState } from 'react'
import axios from 'axios';



function App() {
  const [country, setCountry] = useState({})
  const [foundCountries, setFoundCountries] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

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

    if(found.length > 10){
      setErrorMessage("Too many matches, specify another filter")
      setFoundCountries([])
    } else{
      setErrorMessage("")
      setFoundCountries(found)
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
    </>
  )
}

export default App
