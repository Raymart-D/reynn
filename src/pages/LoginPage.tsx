import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css'; // Import the CSS Module

const LoginPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1> Login to Records Management System</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginPage;