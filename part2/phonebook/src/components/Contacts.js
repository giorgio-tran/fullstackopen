import React, {useState, useEffect} from 'react'

import contactsService from '../services/contacts'

const Contacts = ({ personsContacts, newFilterContacts, buttonHandler }) => {
	
	//show the name based on input of filter 
    const filterByName = personsContacts.filter((person) =>
		person.name
			.toLowerCase()
			.includes(newFilterContacts)
	)

    //maps each persons name
	const mapArray = (array) => {
		return (
			array.map((person) =>
				<div key={person.id}>
					{person.name} {person.number} 
					<button id={person.id} onClick={buttonHandler}>
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