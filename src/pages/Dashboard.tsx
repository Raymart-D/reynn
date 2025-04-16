import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Records Office</h2>
                <nav>
                    <Link to="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                    <Link to="/dashboard/records-management" className="nav-link">
                        Records Management
                    </Link>
                    <Link to="/dashboard/reports" className="nav-link">
                        Reports
                    </Link>
                    <Link to="/dashboard/settings" className="nav-link">
                        Settings
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="dashboard-header">
                    <h1>Records Office Management System</h1>
                    <p>Welcome, Records Unit</p>
                </header>

                {/* Summary Cards */}
                <div className="card-container">
                    <div className="card">
                        <h3>Total Records</h3>
                        <p>1,234</p>
                    </div>
                    <div className="card">
                        <h3>Pending Approvals</h3>
                        <p>12</p>
                    </div>
                    <div className="card">
                        <h3>Recently Updated</h3>
                        <p>5 records updated today</p>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className="analytics-section">
                    <div className="chart">
                        <h3>Monthly Records Overview</h3>
                        <div className="chart-placeholder">[Chart Goes Here]</div>
                    </div>
                    <div className="table">
                        <h3>Records List</h3>
                        <table className="records-table">
                            <thead>
                                <tr>
                                    <th>Memo No.</th>
                                    <th>Date</th>
                                    <th>File Name</th>
                                    <th>Description</th>
                                    <th>Download</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>9</td>
                                    <td>2025</td>
                                    <td>Raymart De Guzman</td>
                                    <td>Request</td>
                                    <td><button className="download-button">⬇</button></td>
                                    <td>
                                        <button className="action-button preview">Preview</button>
                                        <button className="action-button edit">Edit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;