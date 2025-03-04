import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        setShowDropdown(false);
        navigate('/');
    };

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        BlogApp
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Blogs">
                                    Blog
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">
                                    Contact
                                </NavLink>
                            </li>
                            {!isLoggedIn && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/Register">
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>

                        <div className="account-section">
                            <div className="user-avatar" onClick={() => setShowDropdown(!showDropdown)}>
                                <span>{user.username ? user.username[0].toUpperCase() : 'G'}</span>
                            </div>
                            {showDropdown && (
                                <div className="account-dropdown">
                                    <div className="user-info">
                                        <h6>{user.username || 'Guest'}</h6>
                                        <small>{isAdmin ? 'Administrator' : (user.email || 'Guest User')}</small>
                                    </div>
                                    {isLoggedIn && (
                                        <>
                                            <div className="dropdown-divider"></div>
                                            {isAdmin && (
                                                <Link to="/admin" className="dropdown-link">
                                                    Dashboard
                                                </Link>
                                            )}
                                            <button onClick={handleLogout} className="dropdown-link">
                                                Logout
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
