import React from 'react'

const Country = ({country}) => {
	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital: {country.capital}</div>
			<div>area: {country.area}</div>
			<h2>Languages</h2>
			<ul>
				{Object.keys(country.languages).map((key) => {
					console.log("key", key)
					return <li key={key}>{country.languages[key]}</li>
				})}
			</ul>
			<img src = {country.flags.png} alt="flag" />
		</div>
	)
}

export default Country