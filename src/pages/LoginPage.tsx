import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css';

const LoginPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Welcome to Log in Records Unit</h1>
            <h2>Login Page</h2>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginPage;