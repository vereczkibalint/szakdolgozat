import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GoBackButton from './GoBackButton';
import Alert from './Alert';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { updateStudent, updateLecturer } from '../../admin/services/userService';

const UserDetails = ({ history, type, user }) => {

    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.auth.user);

    const [role, setRole] = useState(user.role);
    const [neptun, setNeptun] = useState(user.neptun);
    const [lastName, setLastName] = useState(user.lastName);
    const [firstName, setFirstName] = useState(user.firstName);
    const [email, setEmail] = useState(user.email);

    const [editMode, setEditMode] = useState(false);

    const errorMessage = useSelector(state => state.users.errors.message);
    const errors = useSelector(state => state.users.errors.errors);

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

    function checkErrorExists(path) {
        return errors && !!errors.find(err => err.path === path);
    }

    function getErrorMessage(path) {
        if(checkErrorExists(path)){
            return errors.find(err => err.path === path).message;
        }
    }

    function renderEditRow() {
        if(loggedInUser.role === 'ADMIN') {
            if(editMode) {
                return (
                    <Fragment>
                        <Button variant="success" className="mb-3" onClick={() => handleSave()} disabled={!canCreate}>
                            <FontAwesomeIcon icon={faCheckCircle} /> Mentés
                        </Button>
                        <Button variant="danger" className="mb-3" onClick={() => setEditMode(current => !current)}>
                            <FontAwesomeIcon icon={faTimesCircle} /> Mégsem
                        </Button>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <Button variant="primary" className="mb-3" onClick={() => setEditMode(current => !current)}>
                            <FontAwesomeIcon icon={faEdit} /> Szerkeszt
                        </Button>
                    </Fragment>
                );
            }
        }
    }

    const canCreate = role === 'ADMIN' ? lastName.length >= 4 && firstName.length >= 4 && /([^\s]).+@([^\s])[^.]+(\..+)/g.test(email) : neptun.length === 6 && lastName.length >= 4 && firstName.length >= 4 && /([^\s]).+@([^\s])[^.]+(\..+)/g.test(email);

    return (
        <div className="mt-5">
        { errorMessage && <Alert type="danger" message={errorMessage} /> }
        <div className={`d-flex ${loggedInUser.role === 'ADMIN' ? 'justify-content-around' : 'justify-content-start'}`}>
            <GoBackButton />
            { renderEditRow() }
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
                                <h6 className="font-weight-bold">Azonosító</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {user._id}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="font-weight-bold"><Form.Label htmlFor="lastName">Vezetéknév</Form.Label></h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {editMode ?
                                    <Fragment>
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
                                    </Fragment>:
                                    lastName
                                }
                            </div>
                        </div>
                        <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold"><Form.Label htmlFor="firstName">Keresztnév</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {editMode ?
                                        <Fragment>
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
                                        </Fragment> :
                                        firstName
                                    }
                                </div>
                            </div>
                        { role !== 'ADMIN' && (
                            <Fragment>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="font-weight-bold"><Form.Label htmlFor="neptun">NEPTUN</Form.Label></h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {editMode ?
                                            <Fragment>
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
                                            </Fragment> :
                                            neptun
                                        }
                                    </div>
                                </div>
                            </Fragment>)}
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold"><Form.Label htmlFor="email">Email</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {editMode ?
                                        <Fragment>
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
                                        </Fragment> :
                                        email
                                    }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold">Jogosultság</h6>
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
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold">Létrehozás ideje</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {new Date(user.createdAt).toLocaleString("hu-HU")}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold">Utolsó frissítés ideje</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {new Date(user.updatedAt).toLocaleString("hu-HU")}
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
