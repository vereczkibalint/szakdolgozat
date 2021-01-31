import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { Link } from 'react-router-dom';
import { logout } from '../services/authService';
import {NavDropdown} from "react-bootstrap";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/admin/dashboard" className="navbar-brand">Vezérlőpult</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#admin_navbar" aria-controls="admin_navbar" aria-expanded="false" aria-label="Navigáció">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="admin_navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/admin/dashboard/students" className="nav-link">Hallgatók</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/dashboard/lecturers" className="nav-link">Oktatók</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <NavDropdown title={user.lastName + ' ' + user.firstName + ' (ügyintéző)'} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/admin/settings">Beállítások</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="text-danger" onClick={() => dispatch(logout())}>Kijelentkezés</NavDropdown.Item>
                    </NavDropdown>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
