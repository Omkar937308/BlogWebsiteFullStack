import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Show success message and redirect to login page
            alert('Registration successful! Please login with your credentials.');
            navigate('/login');
            
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className={styles['register-box']}>
                <h2 className={styles['register-title']}>Register</h2>
                {error && <div className={styles['error-message']}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-group']}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className={styles['form-control']}
                            placeholder="Choose a username"
                            disabled={loading}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={styles['form-control']}
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={styles['form-control']}
                            placeholder="Create a password"
                            disabled={loading}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className={styles['form-control']}
                            placeholder="Confirm your password"
                            disabled={loading}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={styles['register-button']}
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>
                <div className={styles['additional-links']}>
                    <span>Already have an account? </span>
                    <a href="/login">Login here</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
