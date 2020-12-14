import React from 'react';
import './ErrorPage.css';

const NotFound = () => {
    return (
        <div className="row">
        <div className="col-md-12">
            <div className="error">
                <h1>Hiba történt!</h1>
                <h2>404 - Az oldal nem található!</h2>
            </div>
        </div>
    </div>
    )
}

export default NotFound;
