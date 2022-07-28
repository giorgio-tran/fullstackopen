require('dotenv').config()
const express = require('express')
const app = express()
const Blog = require('./models/blog') 

app.get('/', (req, res) => {
    res.send('<h1> Hello World! </h1>')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})