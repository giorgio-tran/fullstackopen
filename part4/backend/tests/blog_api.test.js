const mongoose = require('mongoose')
const supertest = require('supertest')
const { post } = require('../app')
const app = require('../app')
/* creates a superagent object with app.js,
 which is used for testing */
const api = supertest(app)
const Blog = require('../models/blog')

//setup initial blogs 
const initialBlogs = [
  {
    title: "Rocky Mountains",
    author: "John Cena",
    url: "google.com",
    likes: 20, 
  },
  {
    title: "Best Man",
    author: "Kael",
    url: "google.com",
    likes: 19
  }
]
//clears data and adds testing data before each test
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('unique identifier property is id', async () => {
  const response = await api.get('/api/blogs')
  const firstBlogObject = response.body[0]
  expect(firstBlogObject.id).toBeDefined()
})

test('posting increases length by 1', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: "Bored", 
      author: "Shaman", 
      url: "google.com", 
      likes: 5
    })

  const response = await api.get('/api/blogs')
  console.log(response.body)
  expect(response.body).toHaveLength(initialBlogs.length + 1);
})

test('posting without likes property defaults likes to 0', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: "Einz",
      author: "Waalz",
      url: "google.com",
    })
  
  const response = await api.get('/api/blogs')
  const addedBlog = response.body[response.body.length-1]
  console.log(response.body)
  expect(addedBlog.likes).toBe(0)
})

test('title and url missing responds with status code 400', async () => {
  await api
    .post('/api/blogs')
    .send({})
    .expect(400)
}) 
afterAll(() => {
  mongoose.connection.close()
})