require('dotenv').config() 
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const person = require('./models/person')
const app = express()

//morgan token that returns body of req
morgan.token('objectInfo', (req, res) => {
  return (
    JSON.stringify(req.body)
  )
})

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
app.use(express.static('build'))
app.use(cors())
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :objectInfo'
))

//get request to the server
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
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
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    //next with params moves to error handler middleware
    .catch(error => next(error))
})

//deletes person in MongoDB
app.delete('/api/persons/:id', (request, response) => {
  Node.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number are missing'
    })
  } 

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//error handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  //cast error is mongodb specific, can't create objectid
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

//ensures that the server is running
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})