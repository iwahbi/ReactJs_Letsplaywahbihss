import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = ({ isLoggedIn }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <ul className="navbar-nav me-auto">
                {isLoggedIn ? (
                    <>
                        <li className="nav-item">
                            <Link  className="nav-link" to="/users">All Users</Link>
                        </li>
                        <li  className="nav-item">
                            <Link  className="nav-link" to="/edit-profile">Edit Profile</Link>
                        </li>
                        <li  className="nav-item">
                            <Link  className="nav-link" to="/score">score</Link>
                        </li>
                        <li  className="nav-item">
                            <Link  className="nav-link" to="/logout">Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li  className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li  className="nav-item">
                            <Link  className="nav-link" to="/registration">Registration</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
