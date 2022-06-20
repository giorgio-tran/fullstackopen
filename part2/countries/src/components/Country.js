import React from 'react'

import Weather from './Weather'

const Country = ({country}) => {

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital: {country.capital}</div>
			<div>area: {country.area}</div>
			<h2>Languages</h2>
			<ul>
				{Object.keys(country.languages).map((key) => {
					return <li key={key}>{country.languages[key]}</li>
				})}
			</ul>
			<Weather country={country} />
		</div>
	)
}

export default Country