import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
	const [countries, setCountries] = useState([])
	const [newFilter, setNewFilter] = useState('text')

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
	
	
	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	/* Filter Component */
	const filterByCountryName = countries.filter((country) => 
		country.name.common
			.toLowerCase()
			.includes(newFilter.toLowerCase())
	)
	
	const showFilteredCountries = (array) => {
		return (
			array.map((country) => 
				<div key={country.name.common}>
					{country.name.common}
				</div>
			)
		)
	}

	//if the number of countries < 10, returns them 
	const filtering = () => {
		if (filterByCountryName.length > 10) {
			return (
				"Too many matches, please specify another filter"
			)
		} else {
			return (
				showFilteredCountries(filterByCountryName)
			)
		}
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
			<div>
				{filtering()}
			</div>
		</div>
	)
}

export default App;
