import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            // If no user data found, redirect to login
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userData));
    }, [navigate]);

    if (!user) return null;

    return (
        <div className={styles.dashboard}>
            <h1>Welcome, {user.username}!</h1>
            <div className={styles.content}>
                <div className={styles.userInfo}>
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.isAdmin && <p><strong>Role:</strong> Administrator</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
