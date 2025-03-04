import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Foot() {
    return (
        <footer className="footer bg-light text-center text-lg-start">
            <div className="container p-4">
                <div className="row">
                    {/* About Section */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">About Us</h5>
                        <p>
                            Welcome to SolutionBlogs, your go-to platform for insightful articles for the coding concept the learners faced different problems. Stay updated with the latest trends and tips!
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Quick Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li>
                                <NavLink to="/" className="text-dark">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className="text-dark">About</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Blogs" className="text-dark">Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="text-dark">Contact</NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Contact Us</h5>
                        <ul className="list-unstyled mb-0">
                            <li>Email: SolutionBlogs45@gmail.com</li>
                            <li>Phone: +123 456 7890</li>
                            <li>Address: India</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center p-3 bg-dark text-white">
                © 2025-2028 SolutionBlogs. All Rights Reserved.
            </div>
        </footer>
    );
};
