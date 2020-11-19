import React from 'react';
import './Unauthorized.css';

const Unauthorized = () => {
    return (
        <div className="row">
        <div className="col-md-12">
            <div className="error-unauthorized">
                <h1>Hiba történt!</h1>
                <h2>401 - Hozzáférés megtagadva!</h2>
            </div>
        </div>
    </div>
    )
}

export default Unauthorized;
