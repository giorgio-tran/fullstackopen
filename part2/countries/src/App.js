import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'

const App = () => {
	const [countries, setCountries] = useState([])
	const [newFilter, setNewFilter] = useState('')
	const [clickedCountry, setClickedCountry] = useState(false)
	const [idOfButton, setIdOfButton] = useState(0)

	//connects to the countries api
	useEffect(() => {
		console.log('effect')
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
			})
	}, [])
	console.log('render', countries.length, 'countries')
	
	//handles changes in input box
	const handleFilterChange = (event) => {
		//set the toggle to false 
		setClickedCountry(false)
		setNewFilter(event.target.value)
	}
	//handles 'show' button
	const handleClickedCountry = (event) => {
		event.preventDefault()
		//set the toggle to true 
		setClickedCountry(true)
		setIdOfButton(event.target.id)
		console.log('idOfButton', event.target.id)
	}

	/* Filter Component */
	const filterByCountryName = countries.filter((country) => 
		country.name.common
			.toLowerCase()
			.includes(newFilter.toLowerCase())
	)

	//shows the filtered countries on the page
 	const showFilteredCountries = (array) => {
		console.log("filtered array", array)
		return (
			array.map((country) => {
				console.log('show filtered country:', array.indexOf(country), country.name.common)
				return (
					<div key={country.name.common}>
						{country.name.common} 
						<button id={array.indexOf(country)} onClick={handleClickedCountry}> show </button>
					</div>
				)
			})
		)
	}

	//if the number of countries < 10, returns them 
	const filtering = () => {
		//if country is greater than 10 return string
		if (filterByCountryName.length > 10) {
			return (
				"Too many matches, please specify another filter"
			)
		} 
		if (filterByCountryName.length === 1) {
			console.log('languages', filterByCountryName[0].languages)
			return (
				<Country country={filterByCountryName[0]} />
			)
		}
		//returns the name of the countries by name 
		if (clickedCountry === true) {
			console.log(filterByCountryName[idOfButton])
			return (
				<Country country={filterByCountryName[idOfButton]} />
			)
		}

		return (
			showFilteredCountries(filterByCountryName)
		)
		
	}

	return (
		<div>
			<div>
				find countries:
				<input 
					value={newFilter} 
					onChange={handleFilterChange} 
				/>
			</div>
			<div>{filtering()}</div>
		</div>
	)
}

export default App;
