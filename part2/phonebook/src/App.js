import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '8081234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //adds person's name 
  const addContact = (event) => {
    event.preventDefault()
    const contactObj = {name: newName, number: newNumber}
    //checks to see if the person is already on the list
    const duplicate = persons.filter((person) =>
      person.name === contactObj.name
    )
    //checks for duplicate in the list
    if (duplicate.length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      //adds contact to the list
      setPersons(persons.concat(contactObj))
      setNewName('')
      setNewNumber('')
    }
    console.log('persons', persons)
  }

  //for input's onChange of name
  const handleNameChange =(event) => {
    setNewName(event.target.value)
  }

  //for input's onChange of number
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //prints each element in persons
  const nameList = persons.map((person) =>
      <div key={person.name}>
        {person.name} {person.number}
      </div>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            type="number"
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div> {nameList} </div>
    </div>
  )
}

export default App