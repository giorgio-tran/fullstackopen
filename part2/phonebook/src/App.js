import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  //adds name to persons
  const addName = (event) => {
    event.preventDefault()
    const nameObj = {name: newName}
    setPersons(persons.concat(nameObj))
    setNewName('')
    console.log(persons)
  }
  //for input's onChange
  const handleNameChange =(event) => {
    setNewName(event.target.value)
  }
  //prints each element in persons
  const nameList = persons.map((person) =>
      <div key={person.name}>
        {person.name}
      </div>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
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