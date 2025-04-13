import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/SignUpPage.module.css';

const SignUpPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>New Member of Records Office?</h1>
            <h2>Sign Up Here</h2>
            <form>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
};

export default SignUpPage;