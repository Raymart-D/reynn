import React, { useState } from 'react';
import './Settings.css'; // Add styles for the settings page

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('General');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'General':
                return (
                    <div>
                        <h2>General Settings</h2>
                        <label>
                            Dark Mode:
                            <input type="checkbox" />
                        </label>
                        <label>
                            Notifications:
                            <input type="checkbox" />
                        </label>
                        <label>
                            Compact View:
                            <input type="checkbox" />
                        </label>
                    </div>
                );
            case 'Scanner':
                return (
                    <div>
                        <h2>Scanner Settings</h2>
                        <label>
                            Scanner IP Address:
                            <input type="text" placeholder="192.168.1.100" />
                        </label>
                        <label>
                            Default Resolution:
                            <select>
                                <option value="300">300 DPI</option>
                                <option value="600">600 DPI</option>
                            </select>
                        </label>
                        <label>
                            Default Color Mode:
                            <select>
                                <option value="Color">Color</option>
                                <option value="Grayscale">Grayscale</option>
                            </select>
                        </label>
                        <label>
                            Double-sided Scanning:
                            <input type="checkbox" />
                        </label>
                        <label>
                            Automatic Document Feeder:
                            <input type="checkbox" />
                        </label>
                    </div>
                );
            case 'Storage':
                return (
                    <div>
                        <h2>Storage Settings</h2>
                        <p>Storage Usage: 23% of 1GB</p>
                        <button>View Backup Options</button>
                    </div>
                );
            case 'Security':
                return (
                    <div>
                        <h2>Security Settings</h2>
                        <label>
                            Current Password:
                            <input type="password" />
                        </label>
                        <label>
                            New Password:
                            <input type="password" />
                        </label>
                        <label>
                            Confirm New Password:
                            <input type="password" />
                        </label>
                        <label>
                            Two-Factor Authentication:
                            <input type="checkbox" />
                        </label>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <div className="tabs">
                <button
                    className={activeTab === 'General' ? 'active' : ''}
                    onClick={() => setActiveTab('General')}
                >
                    General
                </button>
                <button
                    className={activeTab === 'Scanner' ? 'active' : ''}
                    onClick={() => setActiveTab('Scanner')}
                >
                    Scanner
                </button>
                <button
                    className={activeTab === 'Storage' ? 'active' : ''}
                    onClick={() => setActiveTab('Storage')}
                >
                    Storage
                </button>
                <button
                    className={activeTab === 'Security' ? 'active' : ''}
                    onClick={() => setActiveTab('Security')}
                >
                    Security
                </button>
            </div>
            <div className="tab-content">{renderTabContent()}</div>
            <div className="account-info">
                <h2>Account Information</h2>
                <p>Full Name: Administrator</p>
                <p>Email: admin@example.com</p>
                <p>Role: System Administrator</p>
                <p>Account Created: January 15, 2023</p>
                <p>Last Login: Today, 9:32 AM</p>
                <p>Status: <span className="status-active">Active</span></p>
                <button>Edit Account Information</button>
            </div>
        </div>
    );
};

export default Settings;