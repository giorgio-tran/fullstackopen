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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}