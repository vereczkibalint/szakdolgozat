import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../services/authService';

const Navbar = ({ logout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/admin/dashboard" className="navbar-brand">Vezérlőpult</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#admin_navbar" aria-controls="admin_navbar" aria-expanded="false" aria-label="Navigáció">
                <span className="navbar-toggler-icon"></span>
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
                    <Link to="" style={{ cursor: "pointer" }} className="nav-link" onClick={logout}>Kijelentkezés</Link>
                </ul>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Navbar);
