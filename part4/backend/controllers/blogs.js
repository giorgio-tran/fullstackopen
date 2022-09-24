const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)  
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    let blog = null;

    if (!body.title || !body.url) {
      return response.status(400).end()
    }
    
    if (!body.likes) {
      blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0
      })
    } else {
      blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
      })
    } 
    
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

module.exports = blogsRouter