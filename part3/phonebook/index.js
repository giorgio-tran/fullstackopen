const express = require('express')
const app = express()

//array of persons
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
//get request to the server
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//convert into a string, the browser will interpret it as html
app.get('/info', (request, response) => {
    response.send(
        `<div> 
          <p>
            Phonebook has info for ${persons.length} people
          </p>
          <p>
            ${new Date()}
          </p>
        </div>`
  )
})

//get an individual person, if person is found 
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

//deletes person by filtering out the person who possesses the particular ID
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

//generates a random number less than 100k
const generateId = () => {
  return (
    Math.floor(Math.random() * 100000)
)}


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content is missing'
    })
  } 

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})
//ensures that the server is running
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})