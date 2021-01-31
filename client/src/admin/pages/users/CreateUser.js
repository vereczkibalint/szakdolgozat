import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, withRouter } from 'react-router-dom';

import { Button, Form, FormGroup } from "react-bootstrap";

import Alert from "../../../common/components/Alert";
import GoBackButton from "../../../common/components/GoBackButton";

import { insertStudent, insertLecturer } from "../../services/userService";

const CreateUser = ({ history }) => {
    const { type } = useParams();

    if(!['student', 'lecturer'].includes(type)){
        history.push('/admin/dashboard/lecturers');
    }

    const dispatch = useDispatch();

    let errorMessage = useSelector(state => state.users.errors.message);
    let errors = useSelector(state => state.users.errors.errors);

    const [userType, setUserType] = useState(type);
    const [neptun, setNeptun] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    const canCreate = neptun.length === 6 && lastName.length >= 4 && firstName.length >= 4 && /([^\s]).+@([^\s])[^.]+(\..+)/g.test(email);

    function handleUserCreate() {
        if(canCreate){
            const user = {
                neptun,
                lastName,
                firstName,
                email,
                password: `EKE_${neptun}`,
                role: userType.toUpperCase()
            };

            if(userType === 'student'){
                dispatch(insertStudent(user, history));
            } else {
                dispatch(insertLecturer(user, history));
            }
        }
    }

    function checkErrorExists(path) {
        return errors && !!errors.find(err => err.path === path);
    }

    function getErrorMessage(path) {
        if(checkErrorExists(path)){
            return errors.find(err => err.path === path).message;
        }
    }

    return (
        <div className="mt-4 w-75 mx-auto">
            <GoBackButton />
            <h1 className="text-center mb-4">Új felhasználó felvétele</h1>
            { errorMessage && <Alert type="danger" message={errorMessage} /> }
            <Form className="w-auto mx-auto">
                <FormGroup className="d-flex justify-content-around">
                    <Form.Check
                        type={"radio"}
                        id={"student"}
                        name={"user"}
                        checked={userType === 'student'}
                        onChange={() => setUserType('student')}
                        label={"Hallgató létrehozása"}
                    />
                    <Form.Check
                        type={"radio"}
                        id={"lecturer"}
                        name={"user"}
                        checked={userType === 'lecturer'}
                        onChange={() => setUserType('lecturer')}
                        label={"Oktató létrehozása"}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="neptun">NEPTUN azonosító</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="NEPTUN azonosító"
                        id="neptun"
                        value={neptun}
                        onChange={(e) => setNeptun(e.target.value)}
                        isInvalid={!!getErrorMessage('neptun')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('neptun')}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        6 karakter, betűk és számok.
                    </Form.Text>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="lastName">Vezetéknév</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Vezetéknév"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        isInvalid={!!getErrorMessage('lastName')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('lastName')}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Legalább 4 karakter.
                    </Form.Text>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="firstName">Keresztnév</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Keresztnév"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        isInvalid={!!getErrorMessage('firstName')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('lastName')}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Legalább 4 karakter.
                    </Form.Text>
                </FormGroup>
                <FormGroup>
                    <Form.Label htmlFor="email">Email cím</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email cím"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!getErrorMessage('email')}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('email')}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Érvényes email cím. (ajánlott: @gmail.com)
                    </Form.Text>
                </FormGroup>
                <Button
                    className="mb-3"
                    variant="primary"
                    onClick={() => handleUserCreate()}
                    disabled={!canCreate}>Mentés</Button>
            </Form>
        </div>
    );
}

export default withRouter(CreateUser);