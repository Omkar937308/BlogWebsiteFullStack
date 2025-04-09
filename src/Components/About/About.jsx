import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SolutionBlogs from "../../assets/SolutionBlogs.webp";
import "./About.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.section 
            id="about-us" 
            className="container py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Intro Section */}
            <div className="row align-items-center mb-5">
                <motion.div
                    className={`col-md-6 text-center`}
                    whileHover={{ scale: 1.03 }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <img
                        src={SolutionBlogs}
                        alt="About Us"
                        className="img-fluid w-75 rounded shadow-lg"
                    />
                </motion.div>

                <motion.div 
                    className="col-md-6"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-primary fw-bold mb-3">About Us</h2>
                    <p className="text-muted">
                        Welcome to our blogging haven! We are a group of passionate writers, creators, and thinkers who love to share stories, insights, and ideas.
                    </p>
                    <p className="text-muted">
                        Whether you’re here for inspiration, learning, or entertainment, we aim to spark curiosity and provide value through meaningful content.
                    </p>
                    <NavLink to="/contact" className="btn btn-primary mt-3">
                        Contact Us
                    </NavLink>
                </motion.div>
            </div>

            {/* Mission Section */}
            <motion.div 
                className="row my-5 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="fw-bold text-secondary mb-4">Our Mission</h3>
                <p className="text-muted col-md-10 mx-auto">
                    Our mission is to create a platform that empowers individuals to share their voices and ideas with the world.
                    We believe in fostering a community that values creativity, diversity, and knowledge sharing.
                </p>
            </motion.div>

            {/* Team Section */}
            <motion.div 
                className="row text-center my-5 team-section"
                initial="hidden"
                whileInView="visible"
                transition={{ staggerChildren: 0.2 }}
            >
                <h3 className="fw-bold text-secondary mb-4">Meet Our Team</h3>

                {teamData.map((member, i) => (
                    <motion.div 
                        className="col-md-4"
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src={member.image} alt={member.name} className="rounded-circle mb-3" />
                        <h5>{member.name}</h5>
                        <p className="text-muted">{member.role}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div 
                className="row my-5 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h3 className="fw-bold text-secondary mb-4">Join Us Today!</h3>
                <p className="text-muted col-md-10 mx-auto">
                    Become part of our growing community and share your thoughts, ideas, and stories with the world.
                    We provide you with the tools and platform to make your voice heard.
                </p>

                <NavLink to="/Register" className="btn btn-success mt-3 lyt">
                    Sign Up
                </NavLink>
            </motion.div>
        </motion.section>
    );
}

// Team data for reusability
const teamData = [
    {
        name: "Aditya Chavhan",
        role: "Founder & Editor-in-Chief",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Om Wani",
        role: "CEH and Problem Solver",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Ajay Chauhan",
        role: "Software Developer at Wipro",
        image: "https://via.placeholder.com/150"
    }
];
