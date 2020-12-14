import React from 'react';
import './ErrorPage.css';

const Unauthorized = () => {
    return (
        <div className="row">
        <div className="col-md-12">
            <div className="error">
                <h1>Hiba történt!</h1>
                <h2>401 - Hozzáférés megtagadva!</h2>
            </div>
        </div>
    </div>
    )
}

export default Unauthorized;
