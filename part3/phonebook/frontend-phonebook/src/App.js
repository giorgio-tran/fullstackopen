import {useState, useEffect} from 'react'
import contactsService from './services/contacts'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import './index.css'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [message, setMessage] = useState(null)
	const [style, setStyle] = useState(null)
	
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
			if (window.confirm(`${newName} is already added to phonebook. Replace the old number with the new one?`)) {
				contactsService
					.update(duplicate[0].id, contactObj)
					.then(returnedPerson => {
						setPersons(persons.map(person => 
							person.name !== newName
								? person
								: returnedPerson
						))
					})
					.catch(error => 
						setMessage(error.response.data.error),
						setStyle('error'),
						setTimeout(() => {
							setMessage(null)
						}, 5000))
			}
		} else {
			//adds person to the list
			contactsService
				.create(contactObj)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
					setMessage(`Added ${contactObj.name}`)
					setStyle('added')
					setTimeout(() => {
					setMessage(null)
					}, 5000)
				})
				//catches the error and sends notif on screen
				.catch(error => 
					setMessage(error.response.data.error),
					setStyle('error'),
					setTimeout(() => {
						setMessage(null)
					}, 5000)
				)

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
		console.log(event.target.id)
		const getPerson = persons.filter(person => person.id === event.target.id)

		if (window.confirm(`Delete ${getPerson[0].name}?`)) {
			contactsService
				.remove(event.target.id)
				.catch(error => {
					setStyle('error')
					setMessage(`Information of ${getPerson[0].name} was already deleted`)
					setTimeout(() => {
						setMessage(null)
					}, 3000)
				})
				.then(
					setPersons(persons.filter(person => 
						person.id !== event.target.id
					))
				)
		}
	}

	return (
		<div className='parent-container'>
			<div className='container'>
				<div className='left'>
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
				</div>
				<Notification message={message} alertStyle={style}/>
				<div className='right'>
					<h2>Numbers</h2>
					<Contacts
						personsContacts={persons}
						newFilterContacts={newFilter}
						buttonHandler={handleRemoveContact}
					/>
				</div>
			</div>
		</div>
	)
}

export default App