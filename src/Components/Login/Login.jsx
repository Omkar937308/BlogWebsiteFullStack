import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed. Please try again.');
            }

            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', 'true');
            if (data.isAdmin) {
                localStorage.setItem('isAdmin', 'true');
            }

            // Redirect to home page
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className={styles["login-box"]}>
                <h2 className={styles["login-title"]}>Login</h2>
                {error && <div className={styles["error-message"]}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={styles["form-control"]}
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={styles["form-control"]}
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={styles["login-button"]}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className={styles["additional-links"]}>
                    <a href="#forgot">Forgot Password?</a>
                    <a href="/register">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;