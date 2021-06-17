import React from 'react'

const CountryContent = ({ countryList, countryFilter }) => {

	const countriesFiltered = countryList.filter(country => country.name.toLowerCase().includes(countryFilter))

	if (countriesFiltered.length > 10) {
		return <div>Too many matches, specify another filter</div>
	} else if (countriesFiltered.length > 1) {
		return <Countrylist countrylist={countriesFiltered} />
	} else if (countriesFiltered.length === 1) {
		return <CountryInfo country={countriesFiltered[0]} />
	} else {
		return <div>No corresponding countries, specify another filter</div>
	}
}

const Countrylist = ({ countrylist }) => countrylist.map(country => <div>{country.name}</div>)

const CountryInfo = ({ country }) => {
	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>
			<h2>languages</h2>
			<ul>
				{country.languages.map(language => <li>{language.name}</li>)}
			</ul>
			<img src={country.flag} alt={`flag of ${country.name}`} width='300px' />
		</div>
	)
}

export default CountryContent