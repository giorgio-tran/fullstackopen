const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

/* creates a superagent object with app.js,
 which is used for testing */
const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})