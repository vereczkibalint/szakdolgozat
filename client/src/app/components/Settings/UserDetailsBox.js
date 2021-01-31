import React from 'react';
import { useSelector } from 'react-redux';
import moment from "moment";
import Form from 'react-bootstrap/Form';

const UserDetailsBox = () => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className="mt-5">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src={`https://eu.ui-avatars.com/api/?name=${user.lastName + '+' + user.firstName}&size=256`} alt={`${user.lastName} + '+' + ${user.firstName} avatar`} className="rounded-circle" width="128" />
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
                                    <h6 className="font-weight-bold"><Form.Label htmlFor="lastName">Vezetéknév</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    { user.lastName }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold"><Form.Label htmlFor="firstName">Keresztnév</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    { user.firstName }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold"><Form.Label htmlFor="neptun">NEPTUN</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    { user.role === 'ADMIN' ? '-' : user.neptun }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold"><Form.Label htmlFor="email">Email</Form.Label></h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    { user.email }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold">Jogosultság</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {
                                        {
                                            'STUDENT': 'Hallgató',
                                            'LECTURER': 'Oktató',
                                            'ADMIN': 'Ügyintéző'
                                        }[user.role]
                                    }
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold">Létrehozás ideje</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {moment(user.createdAt).format("YYYY.MM.DD HH:mm")}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="font-weight-bold">Utolsó frissítés ideje</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {moment(user.updatedAt).format("YYYY.MM.DD HH:mm")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetailsBox;