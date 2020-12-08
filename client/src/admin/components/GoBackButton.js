import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from "react-bootstrap/Button";

const GoBackButton = () => {
    const history = useHistory();
    return (
        <Button variant="info" onClick={() => history.goBack()} className="mb-3">Vissza</Button>
    );
}

export default GoBackButton;