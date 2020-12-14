import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GoBackButton from '../GoBackButton';
import Alert from '../Alert';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { updateStudent, updateLecturer } from '../../services/userService';

const UserDetails = ({ history, type, user }) => {

    const dispatch = useDispatch();

    const [role, setRole] = useState(user.role);
    const [neptun, setNeptun] = useState(user.neptun);
    const [lastName, setLastName] = useState(user.lastName);
    const [firstName, setFirstName] = useState(user.firstName);
    const [email, setEmail] = useState(user.email);

    const [editMode, setEditMode] = useState(false);

    const errorMessage = useSelector(state => state.user.errors.message);
    const errors = useSelector(state => state.user.errors.errors);

    function handleSave() {
        if(canCreate){
            const updatedUser = {
                ...user,
                lastName,
                firstName,
                email,
                neptun,
                role
            };
            if(type === 'student') {
                dispatch(updateStudent(updatedUser, history));
            } else {
                dispatch(updateLecturer(updatedUser, history));
            }
        }
    }

    // TODO: kiemelni ezeket a metódusokat valahova, mert többször használatos
    function checkErrorExists(path) {
        return errors && !!errors.find(err => err.path === path);
    }

    function getErrorMessage(path) {
        if(checkErrorExists(path)){
            return errors.find(err => err.path === path).message;
        }
    }

    const canCreate = neptun.length === 6 && lastName.length >= 4 && firstName.length >= 4 && /([^\s]).+@([^\s])[^.]+(\..+)/g.test(email);

    return (
        <div className="mt-5">
        { errorMessage && <Alert type="danger" message={errorMessage} /> }
        <div className="d-flex justify-content-around">
            <GoBackButton />
            { editMode ? (
                <>
                    <Button variant="success" className="mb-3" onClick={() => handleSave()} disabled={!canCreate}>
                        <FontAwesomeIcon icon={faCheckCircle} /> Mentés
                    </Button>
                    <Button variant="danger" className="mb-3" onClick={() => setEditMode(current => !current)}>
                        <FontAwesomeIcon icon={faTimesCircle} /> Mégsem
                    </Button>
                </>
            ) : (
                <Button variant="primary" className="mb-3" onClick={() => setEditMode(current => !current)}>
                    <FontAwesomeIcon icon={faEdit} /> Szerkeszt
                </Button>
            )}
        </div>
        <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                            <img src={`https://eu.ui-avatars.com/api/?name=${user.lastName + '+' + user.firstName}&size=256`} alt="Admin" className="rounded-circle" width="150" />
                                <div className="mt-3">
                                    <h4>
                                        {user.lastName + ' ' + user.firstName}
                                    </h4>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Azonosító</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {user._id}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0"><Form.Label htmlFor="lastName">Vezetéknév</Form.Label></h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {editMode ?
                                    <>
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
                                    </>:
                                    lastName
                                }
                            </div>
                        </div>
                        <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0"><Form.Label htmlFor="firstName">Keresztnév</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {editMode ?
                                        <>
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
                                                {getErrorMessage('firstName')}
                                            </Form.Control.Feedback>
                                        </> :
                                        firstName
                                    }
                                </div>
                            </div>
                        <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0"><Form.Label htmlFor="neptun">NEPTUN</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {editMode ?
                                        <>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="NEPTUN"
                                            id="neptun"
                                            value={neptun}
                                            onChange={(e) => setNeptun(e.target.value)}
                                            isInvalid={!!getErrorMessage('neptun')}
                                        />
                                            <Form.Control.Feedback type="invalid">
                                                {getErrorMessage('neptun')}
                                            </Form.Control.Feedback>
                                        </> :
                                        neptun
                                    }
                                </div>
                            </div>
                        <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0"><Form.Label htmlFor="email">Email</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {editMode ?
                                        <>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Email cím"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            isInvalid={!!getErrorMessage('email')}
                                        />
                                            <Form.Control.Feedback type="invalid">
                                                {getErrorMessage('email')}
                                            </Form.Control.Feedback>
                                        </> :
                                        email
                                    }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-2">Jogosultság</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {editMode && role !== 'ADMIN' ?
                                        <Form.Control as="select" onChange={(e) => setRole(e.target.value)} value={role}>
                                            <option value="STUDENT" >Hallgató</option>
                                            <option value="LECTURER">Oktató</option>
                                        </Form.Control>
                                        : {
                                            'STUDENT': 'Hallgató',
                                            'LECTURER': 'Oktató',
                                            'ADMIN': 'Admin'
                                          }[role]
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(UserDetails);