import React from 'react'

const PersonForm = ({onSub, name, nameFn, num, numFn}) => {

    return (
        <form onSubmit={onSub}>
            <div>
                name:
                <input 
                    value={name}
                    onChange={nameFn}
                />
            </div>
            <div>
                number:
                <input
                    value={num}
                    type="number"
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