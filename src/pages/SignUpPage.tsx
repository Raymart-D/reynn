import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css'; // Reuse the LoginPage styles

const SignUpPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Register as Records Unit</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login" className={styles.link}>Login</Link>
            </p>
        </div>
    );
};

export default SignUpPage;