import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Betöltés...</span>
        </Spinner>
    )
}

export default LoadingSpinner;
