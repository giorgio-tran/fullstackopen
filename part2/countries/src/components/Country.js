import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
	const [weather, setWeather] = useState([])
	const api_key = process.env.REACT_APP_API_KEY
	const lat = country.latlng[0]
	const lon = country.latlng[1]

	useEffect(() => {
		console.log('weather effect')
		axios
			.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=alerts&appid=${api_key}`)
			.then(response => {
				console.log('weather promise fulfilled')
				setWeather(response.data)
			})
	}, [])
	console.log('render', weather.length)

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
			<h2>Weather in {country.capital}</h2>
			<div>Temperature {}</div>
			{/* <img src={} alt="weather" /> */}
			<div>Wind {} m/s</div>
		</div>
	)
}

export default Country