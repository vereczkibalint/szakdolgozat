import React from 'react';

const Alert = ({ type, message }) => {
    return (
        <div className={`alert alert-${type}`}>
            <b>Hiba:</b> {message}
        </div>
    )
}

export default Alert;
