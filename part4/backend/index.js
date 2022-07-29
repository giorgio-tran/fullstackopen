require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const Blog = require('./models/blog') 

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1> Hello World! </h1>')
})

//gets all of the blogs via find method in DB, converts data to json
app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const body = request.body

    if (!(body.title && body.author && body.url && body.likes)) {
        console.log(body)
        return response.status(400).json({
            error: 'content is missing'
        })
    }

    //creates a blog object based on schema
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })
    //saves to the database or catches error
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => console.log('ERROR:', error))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})