import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SolutionBlogs from "../../assets/SolutionBlogs.webp";
import "./About.css";
import { NavLink } from "react-router-dom";

export default function About() {
    const [hovered, setHovered] = useState(false);

    return (
        <section id="about-us" className="container py-5">
            <div className="row align-items-center mb-5">
                {/* Left Section - Image */}
                <div
                    className={`col-md-6 text-center ${hovered ? "animate__animated animate__pulse" : ""
                        }`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <img
                        src={SolutionBlogs} // Replace with your image URL
                        alt="About Us"
                        // className="img-fluid rounded shadow-lg"
                        className="img-fluid w-75 rounded shadow-lg"
                    />
                </div>

                {/* Right Section - Introduction */}
                <div className="col-md-6">
                    <h2 className="text-primary fw-bold mb-3 animate__animated animate__fadeInUp">
                        About Us
                    </h2>
                    <p className="text-muted animate__animated animate__fadeInUp animate__delay-1s">
                        Welcome to our blogging haven! We are a group of passionate writers, creators, and thinkers who love to share stories, insights, and ideas.
                    </p>
                    <p className="text-muted animate__animated animate__fadeInUp animate__delay-2s">
                        Whether you’re here for inspiration, learning, or entertainment, we aim to spark curiosity and provide value through meaningful content.
                    </p>
                    <a
                        href="/contact"
                        className="btn btn-primary mt-3 animate__animated animate__bounceIn animate__delay-3s"
                    >
                        Contact Us
                    </a>
                </div>
            </div>

            {/* Mission Section */}
            <div className="row my-5 text-center">
                <h3 className="fw-bold text-secondary mb-4 animate__animated animate__fadeInDown">
                    Our Mission
                </h3>
                <p className="text-muted col-md-10 mx-auto animate__animated animate__fadeInUp animate__delay-1s">
                    Our mission is to create a platform that empowers individuals to share their voices and ideas with the world.
                    We believe in fostering a community that values creativity, diversity, and knowledge sharing.
                </p>
            </div>

            {/* Team Section */}
            <div className="row text-center my-5">
                <h3 className="fw-bold text-secondary mb-4 animate__animated animate__fadeInDown">
                    Meet Our Team
                </h3>
                <div className="col-md-4 animate__animated animate__fadeInUp animate__delay-1s">
                    <img
                        src="https://via.placeholder.com/150" // Replace with your image URL
                        alt="Team Member 1"
                        className="rounded-circle mb-3"
                    />
                    <h5>Aditya Chavhan</h5>
                    <p className="text-muted">Founder & Editor-in-Chief</p>
                </div>
                <div className="col-md-4 animate__animated animate__fadeInUp animate__delay-2s">
                    <img
                        src="https://via.placeholder.com/150" // Replace with your image URL
                        alt="Team Member 2"
                        className="rounded-circle mb-3"
                    />
                    <h5>Om Wani</h5>
                    <p className="text-muted">CEH and Problem Solver</p>
                </div>
                <div className="col-md-4 animate__animated animate__fadeInUp animate__delay-3s">
                    <img
                        src="https://via.placeholder.com/150" // Replace with your image URL
                        alt="Team Member 3"
                        className="rounded-circle mb-3"
                    />
                    <h5>Ajay Chauhan</h5>
                    <p className="text-muted">Software Developer at Wipro</p>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="row my-5 text-center">
                <h3 className="fw-bold text-secondary mb-4 animate__animated animate__fadeInDown">
                    Join Us Today!
                </h3>
                <p className="text-muted col-md-10 mx-auto animate__animated animate__fadeInUp animate__delay-1s">
                    Become part of our growing community and share your thoughts, ideas, and stories with the world.
                    We provide you with the tools and platform to make your voice heard.
                </p>



                <NavLink to="/Register" className="btn btn-success mt-3 animate__animated animate__zoomIn animate__delay-2s lyt">
                    Sign Up Now
                </NavLink>
            </div>
        </section >
    );
};
