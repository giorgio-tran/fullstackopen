import {useState, useEffect} from 'react'
import contactsService from './services/contacts'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

	//establish connection with database 
	useEffect(() => {
		console.log('rendered')
		contactsService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	//adds person's name 
	const addContact = (event) => {
		event.preventDefault()
		const contactObj = { name: newName, number: newNumber }
		//checks to see if the person is already on the list
		const duplicate = persons.filter((person) =>
			person.name === contactObj.name
		)
		//checks for duplicate in the list
		if (duplicate.length > 0) {
			alert(`${newName} is already added to phonebook`)
		} else {
			//adds person to the list
			contactsService
				.create(contactObj)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
				})
		}
		console.log('persons', persons)
	}

	//for filter
	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	//for input's onChange of name
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	//for input's onChange of number
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleRemoveContact = (event) => {
		event.preventDefault()
		if (window.confirm('Delete person?')) {
			contactsService
				.remove(event.target.id)
				.then(
					setPersons(persons.filter(person => 
						person.id !== parseInt(event.target.id)
					))
				)
		}
	}
	//console.log(persons)

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter 
				filter={newFilter.toLowerCase()}
				fn={handleFilterChange}
			/>
			<h2>Add a new contact</h2>
			<PersonForm 
				onSub={addContact}
				name={newName}
				nameFn={handleNameChange}
				num={newNumber}
				numFn={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Contacts
				personsContacts={persons}
				newFilterContacts={newFilter}
				buttonHandler={handleRemoveContact}
			/>
		</div>
	)
}

export default App