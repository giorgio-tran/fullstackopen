import React from 'react'

const Filter = ({ filter, fn }) => {
    return (
        <div className='text-and-box'>
            <div>filter shown with:</div>
            <input
                value={filter}
                onChange={fn}
            />
        </div>
    )
}

export default Filter