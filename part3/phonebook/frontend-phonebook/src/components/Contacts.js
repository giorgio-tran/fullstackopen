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
					<div>
						<div> {person.name} </div>
						<div> {person.number} </div>
					</div>
					<div className='delete-and-gap'>
						<button class='delete' id={person.id} onClick={buttonHandler}>
							{/* html entity for multiplication symbol */}
							&#215; 
						</button>
						<div className='delete-gap'></div>
					</div>
				</div>
			)
		)
	}

    return (
    <div className='Contacts'>
        {newFilterContacts === null
			? mapArray(personsContacts)
			: mapArray(filterByName)} 
    </div>
    )
}

export default Contacts