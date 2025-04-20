import React, { useState } from 'react';

const Settings: React.FC = () => {
    const [username, setUsername] = useState('Raymart De Guzman');
    const [email, setEmail] = useState('raymart@example.com');

    const handleSave = () => {
        alert(`Settings saved for ${username}`);
    };

    return (
        <div className="settings">
            <h1>Settings</h1>
            <form>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleSave}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Settings;