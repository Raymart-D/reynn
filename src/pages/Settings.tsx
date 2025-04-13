import React from 'react';
import './Settings.css';

const Settings: React.FC = () => {
    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2 className="sidebar-title">Dashboard</h2>
                <nav>
                    <ul>
                        <li><a href="/dashboard/settings">Settings</a></li>
                        <li><a href="/dashboard/reports">Reports</a></li>
                        <li><a href="/dashboard/records">Manage Records</a></li>
                    </ul>
                </nav>
            </aside>
            <main className="content">
                <h2>Settings</h2>
                <div className="settings-grid">
                    <div className="settings-card">
                        <h3>User Profile</h3>
                        <p>Update your personal information and preferences.</p>
                    </div>
                    <div className="settings-card">
                        <h3>System Preferences</h3>
                        <p>Configure system-wide settings like themes and notifications.</p>
                    </div>
                    <div className="settings-card">
                        <h3>Account Management</h3>
                        <p>Manage your account, including password changes and account deletion.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;