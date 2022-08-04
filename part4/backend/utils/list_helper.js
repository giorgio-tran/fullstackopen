const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length == 0) {
        return 0
    }
    if (blogs.length == 1) {
        return blogs[0].likes
    }
    return blogs.reduce(
        (previousValue, currentValue) => {
            return previousValue + currentValue.likes
        }, 0
    )
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) {
        return 'There are no blogs'
    }

    const blogLikes = blogs.map(blog => {
        return blog.likes
    })
    
    const maxBlogLikes = Math.max(...blogLikes)
    console.log(maxBlogLikes)

    const mostLikedBlogs = blogs.filter(blog => blog.likes === maxBlogLikes)
    console.log(mostLikedBlogs)

    return {
        title: mostLikedBlogs[0].title,
        author: mostLikedBlogs[0].author,
        likes: mostLikedBlogs[0].likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 'There are no blogs'
    }
    //credits: https://www.geeksforgeeks.org/frequent-element-array/
    const hash = new Map()

    for (let i = 0; i < blogs.length; i++) {
        if (hash.has(blogs[i].author)) {
            hash.set(blogs[i].author, hash.get(blogs[i].author) + 1)
        }
        else {
            hash.set(blogs[i].author, 1)
        }
    }

    let max_count = 0
    let res = ''
    hash.forEach((value, key) => {
        if (max_count < value) {
            res = key
            max_count = value
        }
    })

    return {
        author: res,
        blogs: max_count
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const hash = new Map()
    for (let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author
        const likes = blogs[i].likes

        if (hash.has(author)) {
            hash.set(author, hash.get(author) + likes)
        }
        else {
            hash.set(author, likes)
        }
    }

    let mostLikedAuthor = ''
    let totalLikes = 0
    hash.forEach((value, key) => {
        if (totalLikes < value) {
            mostLikedAuthor = key
            totalLikes = value
        }
    })
    
    return {
        author: mostLikedAuthor,
        likes: totalLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}