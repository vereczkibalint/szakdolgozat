import React, { Fragment } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Link, NavLink} from 'react-router-dom';
import { logout } from "../services/authService";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faClipboard,
    faPlus,
    faScroll,
    faTasks,
    faUserClock,
    faUsers
} from "@fortawesome/free-solid-svg-icons";

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
                    { user.role === 'LECTURER' ? (
                        <Fragment>
                            <li className="nav-item">
                                <NavLink to="/user/students" className="nav-link">
                                    <FontAwesomeIcon icon={faUsers} /> Hallgatók
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/user/themes" className="nav-link">
                                    <FontAwesomeIcon icon={faClipboard} /> Szakdolgozati témák
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">
                                    <FontAwesomeIcon icon={faScroll}/> Szakdolgozat
                                </Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/user/theses">
                                        <FontAwesomeIcon icon={faBars} className="mr-2"/> Összes listázása
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <Link className="dropdown-item" to="/user/theses/create">
                                        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Új létrehozása
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">
                                    <FontAwesomeIcon icon={faUserClock} /> Konzultációk
                                </Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/user/consultations">
                                        <FontAwesomeIcon icon={faBars} className="mr-2"/> Összes listázása
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <Link className="dropdown-item" to="/user/consultations/create">
                                        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Új létrehozása
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown">
                                    <FontAwesomeIcon icon={faTasks}/> Mérföldkövek
                                </Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/user/milestones">
                                        <FontAwesomeIcon icon={faBars} className="mr-2"/> Összes listázása
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <Link className="dropdown-item" to="/user/milestones/create">
                                        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Új létrehozása
                                    </Link>
                                </div>
                            </li>
                        </Fragment>

                    ) : (
                        <Fragment>
                            <li className="nav-item">
                                <NavLink to="/user/theses" className="nav-link">Szakdolgozat</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/user/consultations" className="nav-link">Konzultációk</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/user/milestones" className="nav-link">Mérföldkövek</NavLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
                <ul className="navbar-nav ml-auto">
                    <NavDropdown title={user.lastName + ' ' + user.firstName + ` (${user.role === 'LECTURER' ? 'Oktató' : 'Hallgató'})`} id="basic-nav-dropdown">
                        <NavDropdown.Item href={user.role === 'ADMIN' ? "/admin/settings" : "/user/settings"}>Beállítások</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="text-danger" onClick={() => dispatch(logout())}>Kijelentkezés</NavDropdown.Item>
                    </NavDropdown>
                </ul>

            </div>
        </nav>
    )
}

export default Navbar;
