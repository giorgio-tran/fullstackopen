const blogsRouter = require('express').Router()
const app = require('../app')
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

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog)
})

blogsRouter.post('/', async (request, response) => {
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

blogsRouter.delete('/:id', async (request, response, next) => {
  const blogRemoved = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

module.exports = blogsRouter