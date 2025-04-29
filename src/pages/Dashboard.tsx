import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            {/* Header Section */}
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="dashboard-actions">
                    <button className="btn-primary">Add Record</button>
                    <button className="btn-secondary">Scan Document</button>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="stats">
                <div className="stat-card">
                    <h3>Total Records</h3>
                    <p>0</p>
                    <span className="stat-note">Growing collection</span>
                </div>
                <div className="stat-card">
                    <h3>Recent Records</h3>
                    <p>0</p>
                    <span className="stat-note">Added this week</span>
                </div>
                <div className="stat-card">
                    <h3>Favorite Records</h3>
                    <p>0</p>
                    <span className="stat-note">Flagged as important</span>
                </div>
                <div className="stat-card">
                    <h3>Active Records</h3>
                    <p>0</p>
                    <span className="stat-note">Ready for access</span>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts">
                <div className="chart">
                    <h3>Records by Category</h3>
                    <div className="chart-placeholder"></div>
                </div>
                <div className="chart">
                    <h3>Distribution Overview</h3>
                    <div className="chart-placeholder"></div>
                </div>
            </div>

            {/* Recent Records Section */}
            <div className="recent-records">
                <h3>Recent Records</h3>
                <div className="no-records">
                    <p>No records yet</p>
                    <button className="btn-primary">Add Your First Record</button>
                </div>
            </div>

            {/* Quick Actions Section */}
            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <button>Search Records</button>
                <button>Browse Categories</button>
                <button>Import Records</button>
                <button>View Archived Records</button>
            </div>

            {/* System Status Section */}
            <div className="system-status">
                <h3>System Status</h3>
                <p>FileScan Connection: <span className="status-disconnected">Disconnected</span></p>
                <p>Storage Usage: 23% of 1GB</p>
                <p>Last Backup: 3 days ago</p>
                <p>Software Version: v1.2.4</p>
                <button className="btn-link">View System Settings</button>
            </div>
        </div>
    );
};

export default Dashboard;