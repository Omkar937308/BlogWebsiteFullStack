import React from "react";
import { motion } from "framer-motion"; // Import from framer-motion
import { NavLink } from "react-router-dom";
import './Home.css'; // Import your custom CSS for styles

export default function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to the Coding and Cyber Security Blog!</h1>
                <p>
                    Dive into a world where we unravel the toughest coding challenges and
                    cyber security issues. Get insights, solutions, and real-world examples
                    to help you navigate through errors and threats.
                </p>
            </header>

            <section className="home-content-section">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="home-section-title">🚀 Top Coding Errors and How to Fix Them</h2>
                    <p className="home-section-description">
                        As developers, we all face coding errors that seem impossible to fix.
                        But every error is an opportunity to learn and grow.
                    </p>
                </motion.div>

                <div className="home-cards-container">
                    {/* First Error Card */}
                    <motion.div
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        variants={{
                            rest: { transform: 'scale(1)' },
                            hover: { transform: 'scale(1.05)' },
                        }}
                        className="home-card"
                    >
                        <h3>1. Null Pointer Exception in Java</h3>
                        <p>
                            This is one of the most common errors that Java developers face.
                            Null pointer exceptions occur when the program attempts to use a null object reference.
                        </p>
                        <ul>
                            <li>Ensure the object is properly initialized before use.</li>
                            <li>Use <code>Optional</code> or check for null using <code>if</code> conditions.</li>
                            <li>Use logging to track down the source of the null pointer.</li>
                        </ul>
                    </motion.div>

                    {/* Second Error Card */}
                    <motion.div
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        variants={{
                            rest: { transform: 'scale(1)' },
                            hover: { transform: 'scale(1.05)' },
                        }}
                        className="home-card"
                    >
                        <h3>2. Segmentation Fault in C/C++</h3>
                        <p>
                            This error happens when a program tries to access memory locations it shouldn't. It often results in crashes.
                        </p>
                        <ul>
                            <li>Always ensure you are not dereferencing null or uninitialized pointers.</li>
                            <li>Check your array boundaries to avoid out-of-bounds memory access.</li>
                            <li>Use tools like <code>valgrind</code> to detect memory leaks and invalid memory accesses.</li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                > <br /><br />
                    <h2 className="home-section-title">🔐 Top Cyber Security Threats and How to Mitigate Them</h2>
                    <p className="home-section-description">
                        Cyber security is more critical than ever. Stay informed and learn how to protect yourself from the latest threats.
                    </p>
                </motion.div>

                <div className="home-cards-container">
                    {/* First Cyber Security Card */}
                    <motion.div
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        variants={{
                            rest: { transform: 'scale(1)' },
                            hover: { transform: 'scale(1.05)' },
                        }}
                        className="home-card"
                    >
                        <h3>1. Phishing Attacks</h3>
                        <p>
                            Phishing is one of the most prevalent types of cyber attacks. To protect against phishing:
                        </p>
                        <ul>
                            <li>Always double-check the sender’s email address.</li>
                            <li>Never click on suspicious links in emails.</li>
                            <li>Use email filtering tools to detect malicious emails.</li>
                        </ul>
                    </motion.div>

                    {/* Second Cyber Security Card */}
                    <motion.div
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        variants={{
                            rest: { transform: 'scale(1)' },
                            hover: { transform: 'scale(1.05)' },
                        }}
                        className="home-card"
                    >
                        <h3>2. SQL Injection Vulnerabilities</h3>
                        <p>
                            SQL injections occur when an attacker exploits vulnerabilities in your website’s database queries.
                        </p>
                        <ul>
                            <li>Always use parameterized queries to prevent user input from being executed directly as SQL code.</li>
                            <li>Validate user inputs properly, ensuring they match expected patterns.</li>
                            <li>Use ORM (Object-Relational Mapping) libraries that handle queries securely.</li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                > <br /><br />
                    <h2 className="home-section-title">💡 Learn More, Code More, Stay Secure!</h2>
                    <p className="home-section-description">
                        These are just a few of the most common coding errors and cyber security issues. Continue exploring our blog for solutions and best practices!
                    </p>
                </motion.div>
            </section>

            <footer className="home-footer">
                <p>Want more insights? Explore our blog for expert advice, tutorials, and solutions to coding and cyber security issues!</p>
                {/* <a href="/Components/Blogs" className="home-btn">Read More Blogs</a> */}
                <NavLink className="home-btn" to="/Blogs">Read More Blogs</NavLink>
            </footer>
        </div>
    );
}
