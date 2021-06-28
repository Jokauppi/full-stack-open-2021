import React, { useState, useEffect } from 'react'
import axios from "axios";
import CountryContent from './components/countrycontent';

const App = () => {

  const [countryFilter, setCountryFilter] = useState('')
  const [countriesAll, setCountriesAll] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountriesAll(response.data))
  }, [])

  const handleCountryFilter = event => setCountryFilter(event.target.value)

  return (
    <div>
      <div>
        find countries
        <input onChange={handleCountryFilter} value={countryFilter} />
      </div>
      {countryFilter 
        ? <CountryContent countryList={countriesAll} countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
        : <div>Specify a filter</div>
      }
    </div>
  )
}

export default App;
