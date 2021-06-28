import React from 'react'

const CountryContent = ({ countryList, countryFilter, setCountryFilter }) => {

	const countriesFiltered = countryList.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))

	if (countriesFiltered.length > 10) {
		return <div>Too many matches, specify another filter</div>
	} else if (countriesFiltered.length > 1) {
		return countriesFiltered.map(country => {
			return (
				<div>
					{country.name}
					<button onClick={() => setCountryFilter(country.name)}>Show</button>
				</div>
			)
		})
	} else if (countriesFiltered.length === 1) {
		return <CountryInfo country={countriesFiltered[0]} />
	} else {
		return <div>No corresponding countries, specify another filter</div>
	}
}

const CountryInfo = ({ country }) => {
	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>
			<h2>languages</h2>
			<ul>
				{country.languages.map(language => <li key={language.name}>{language.name}</li>)}
			</ul>
			<img src={country.flag} alt={`flag of ${country.name}`} width='300px' />
		</div>
	)
}

export default CountryContent