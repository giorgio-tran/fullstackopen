import React from 'react'
import contactsServices from '../services/contacts'

const Contacts = ({ personsContacts, newFilterContacts}) => {
	//show the name based on input of filter 
    const filterByName = personsContacts.filter((person) =>
		person.name
			.toLowerCase()
			.includes(newFilterContacts)
	)

	const removeContact = (event) => {
		event.preventDefault()
		contactsServices
			.remove(event.target.id)
			.then(
				console.log('removed', event.target.id)
			)
	}

    //maps each persons name
	const mapArray = (array) => {
		return (
			array.map((person) =>
				<div key={person.id}>
					{person.name} {person.number} 
					<button id={person.id} onClick={removeContact}>
						delete 
					</button>
				</div>
			)
		)
	}

    return (
    <div>
        {newFilterContacts === null
			? mapArray(personsContacts)
			: mapArray(filterByName)} 
    </div>
    )
}

export default Contacts