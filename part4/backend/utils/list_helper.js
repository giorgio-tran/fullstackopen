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

module.exports = {
    dummy,
    totalLikes
}