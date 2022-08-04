const listHelper = require('../utils/list_helper')

/* Test arrays */
const listWithZeroBlogs = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f8",
    title: "Something made up",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
]

const highestLikes = {
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  likes: 12,
}

/* Tests */
describe('dummy test', () => {
  test('dummy returns one', () => {
    const listWithZeroBlogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithZeroBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(7 + 5 + 12 + 12 + 10)
  })

})

describe('favorite blog', () => {
  test('when list is zero', () => {
    const result = listHelper.favoriteBlog(listWithZeroBlogs)
    expect(result).toBe('There are no blogs')
  })

  test('of a big list', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(highestLikes)
  })
})

describe('most blogs', () => {
  test('when list is zero', () => {
    const result = listHelper.mostBlogs(listWithZeroBlogs)
    expect(result).toBe('There are no blogs')
  })

  test('of a big list', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({author: 'Edsger W. Dijkstra', blogs: 3})
  })
})

describe('most likes', () => {
  test('when list is zero', () => {
    const result = listHelper.mostLikes(listWithZeroBlogs)
    expect(result).toEqual(null)
  })

  test('with a big list', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 29})
  })
})