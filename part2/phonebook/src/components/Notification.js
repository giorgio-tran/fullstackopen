import React from 'react'

const Notification = ({ message, alertStyle }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={alertStyle}>
            {message}
        </div>
    )
}

export default Notification