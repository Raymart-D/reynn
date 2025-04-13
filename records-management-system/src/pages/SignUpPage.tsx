import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import styles from '../styles/SignUpPage.module.css';

const SignUpPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle sign-up logic here
        console.log('Sign Up:', { username, email, password });
    };

    return (
        <div className={styles.container}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FormInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;