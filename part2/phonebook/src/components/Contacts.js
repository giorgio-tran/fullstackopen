import React from 'react'

const Contacts = ({ personsContacts, newFilterContacts }) => {
    const filterByName = personsContacts.filter((person) =>
		person.name
			.toLowerCase()
			.includes(newFilterContacts)
	)

    const filtering = () => {
		if (newFilterContacts === null) {
			return (
				mapArray(personsContacts)
			)
		} else {
			return (
				mapArray(filterByName)
			)
		}
	}

    //const map array
	const mapArray = (array) => {
		return (
			array.map((person) =>
				<div key={person.name}>
					{person.name} {person.number}
				</div>
			)
		)
	}

    return (
    <div>
        {filtering()}
    </div>
    )
}

export default Contacts