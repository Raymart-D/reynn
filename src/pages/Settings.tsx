import React, { useState } from 'react';
import './Settings.css';

const Settings: React.FC = () => {
    const [settings, setSettings] = useState({
        theme: 'Light',
        notifications: true,
    });

    const handleToggleNotifications = () => {
        setSettings((prev) => ({ ...prev, notifications: !prev.notifications }));
    };

    return (
        <div>
            <h1>Settings</h1>
            <div>
                <label>
                    Theme:
                    <select
                        value={settings.theme}
                        onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                    >
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Notifications:
                    <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={handleToggleNotifications}
                    />
                </label>
            </div>
        </div>
    );
};

export default Settings;