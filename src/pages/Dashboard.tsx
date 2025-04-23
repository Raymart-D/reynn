import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalRecords: 0,
        pendingApprovals: 0,
        recentlyUpdated: 0,
        overdueRecords: 0,
    });

    useEffect(() => {
        // Simulate fetching data from the backend
        const fetchStats = async () => {
            const mockStats = {
                totalRecords: 120,
                pendingApprovals: 5,
                recentlyUpdated: 10,
                overdueRecords: 2,
            };
            setStats(mockStats);
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Dashboard</h2>
                <Link to="/dashboard" className="nav-link active">Dashboard</Link>
                <Link to="/records-management" className="nav-link">Records Management</Link>
                <Link to="/reports" className="nav-link">Reports</Link>
                <Link to="/settings" className="nav-link">Settings</Link>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h1>Welcome to the Dashboard</h1>
                <div className="card-container">
                    <div className="card">
                        <h3>Total Records</h3>
                        <p>{stats.totalRecords}</p>
                    </div>
                    <div className="card">
                        <h3>Pending Approvals</h3>
                        <p>{stats.pendingApprovals}</p>
                    </div>
                    <div className="card">
                        <h3>Recently Updated</h3>
                        <p>{stats.recentlyUpdated}</p>
                    </div>
                    <div className="card">
                        <h3>Overdue Records</h3>
                        <p>{stats.overdueRecords}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;