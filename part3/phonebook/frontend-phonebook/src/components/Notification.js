import React from 'react'

const Notification = ({ message, alertStyle }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={alertStyle}>
            <div>{message}</div>
        </div>
    )
}

export default Notification