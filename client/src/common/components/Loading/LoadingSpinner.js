import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <div className="d-flex flex-column text-center justify-content-center align-items-center m-3">
            <Spinner animation="border" role="status" className="mr-2" /> <br />
            <span>Adatok betöltése...</span>
        </div>
    )
}

export default LoadingSpinner;
