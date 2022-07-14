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

//get request
app.get('/info', async (request, response) => {
    //uses and asynchronous function to get the total number of documents
    let totalPeople = await Person.estimatedDocumentCount()

    response.send(
      `<div> 
        <p>
          Phonebook has info for ${totalPeople} people
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

//updates person in MongoDB
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})

//deletes person in MongoDB
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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

  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

//unknown endpoint handler
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
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

//ensures that the server is running
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})