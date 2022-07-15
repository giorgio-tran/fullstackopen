import React from 'react'

const PersonForm = ({onSub, name, nameFn, num, numFn}) => {

    return (
        <form onSubmit={onSub}>
            <div className='text-and-box'>
                <div>name:</div>
                <input 
                    value={name}
                    type="text"
                    onChange={nameFn}
                />
            </div>
            <div className='text-and-box'>
                <div>number:</div>
                <input
                    value={num}
                    type="text"
                    onChange={numFn}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm