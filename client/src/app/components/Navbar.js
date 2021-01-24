import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Link, NavLink} from 'react-router-dom';
import { logout } from "../services/authService";
import { NavDropdown } from "react-bootstrap";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#17364f' }}>
            <Link to="/admin/dashboard" className="navbar-brand">Vezérlőpult</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#user_navbar" aria-controls="admin_navbar" aria-expanded="false" aria-label="Navigáció">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="user_navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/user/theses" className="nav-link">Szakdolgozat</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/user/consultations" className="nav-link">Konzultációk</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/user/milestones" className="nav-link">Mérföldkövek</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <NavDropdown title={user.lastName + ' ' + user.firstName + ` (${user.role === 'LECTURER' ? 'Oktató' : 'Hallgató'})`} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/user/settings">Beállítások</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="text-danger" onClick={() => dispatch(logout())}>Kijelentkezés</NavDropdown.Item>
                    </NavDropdown>
                </ul>

            </div>
        </nav>
    )
}

export default Navbar;
