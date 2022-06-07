import React from 'react'
//returns the total number of exercises
const Total = ({ parts }) => {
    const sum = parts.reduce(
        (prev, curr) => prev + curr.exercises, 0
    )

    return (
        <h3> 
            total of {sum} exercises
        </h3>
    )
}

export default Total