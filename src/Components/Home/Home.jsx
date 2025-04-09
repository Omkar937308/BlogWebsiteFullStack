import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./Home.css";

// Framer animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

// Card Data
const cardsData = [
    {
        title: "1. Null Pointer Exception in Java",
        description: "Occurs when your code references a null object.",
        tips: [
            "Initialize objects before use.",
            "Use Optional or null checks.",
            "Log object lifecycle carefully."
        ]
    },
    {
        title: "2. Segmentation Fault in C/C++",
        description: "Happens when accessing invalid memory.",
        tips: [
            "Check pointer initialization.",
            "Respect array boundaries.",
            "Use tools like Valgrind."
        ]
    },
    {
        title: "3. Phishing Attacks",
        description: "Trick users into giving sensitive data.",
        tips: [
            "Verify email sources.",
            "Avoid suspicious links.",
            "Use anti-phishing tools."
        ]
    },
    {
        title: "4. SQL Injection",
        description: "Injecting SQL through input fields.",
        tips: [
            "Use parameterized queries.",
            "Validate inputs strictly.",
            "Use ORM libraries."
        ]
    },
    {
        title: "5. Infinite Loop in Python",
        description: "Occurs when the loop condition never becomes false.",
        tips: [
            "Double-check your loop condition.",
            "Add break conditions where needed.",
            "Use debugging tools or print statements."
        ]
    },
    {
        title: "6. XSS (Cross-Site Scripting)",
        description: "Malicious scripts injected into trusted websites.",
        tips: [
            "Sanitize all user inputs.",
            "Use security libraries like DOMPurify.",
            "Set HTTP headers properly."
        ]
    }
];

export default function Home() {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <motion.header
                className="home-hero"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1>Welcome to the Coding & Cyber Security Blog</h1>
                <p>Explore errors, fixes, and security insights from real-world developers.</p>
                <NavLink to="/Blogs" className="cta-button">Explore Blogs</NavLink>
            </motion.header>

            {/* Main Content Section */}
            <motion.section
                className="home-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.2 }}
            >
                <motion.h2 className="section-title" variants={fadeInUp}>
                    Top Coding Errors 🚀
                </motion.h2>
                <motion.p className="section-description" variants={fadeInUp}>
                    Common mistakes developers face and how to tackle them.
                </motion.p>

                {/* Cards */}
                <div className="card-grid">
                    {cardsData.map((card, index) => (
                        <motion.div
                            className="card"
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            <ul>
                                {card.tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Footer */}
            <motion.section
                className="home-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <p>Continue your journey with more coding & security tips</p>
                <NavLink to="/Blogs" className="footer-btn">Read More Blogs</NavLink>
            </motion.section>
        </div>
    );
}
