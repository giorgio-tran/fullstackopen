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
				<div key={person.id} className='text-and-box'>
					<div> {person.name} {person.number} </div>
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