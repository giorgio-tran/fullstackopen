require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()
const Blog = require('./models/blog') 

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

app.post('api/blogs', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(404).json({
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
        .catch(error => console.log(error))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})