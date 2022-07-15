import React from 'react'

const Filter = ({ filter, fn }) => {
    return (
        <div className='text-and-box'>
            <div>search:</div>
            <input
                value={filter}
                onChange={fn}
            />
        </div>
    )
}

export default Filter