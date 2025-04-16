import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const RecordsManagement: React.FC = () => {
    return (
        <div className="records-management">
            {/* Sidebar Navigation */}
            <nav className="sidebar">
                <Link to="/dashboard" className="nav-link">
                    <i className="icon-dashboard"></i> Dashboard
                </Link>
                <Link to="/dashboard/records-management" className="nav-link active">
                    <i className="icon-records"></i> Records Management
                </Link>
                <Link to="/dashboard/reports" className="nav-link">
                    <i className="icon-reports"></i> Reports
                </Link>
                <Link to="/dashboard/settings" className="nav-link">
                    <i className="icon-settings"></i> Settings
                </Link>
            </nav>

            {/* Records List */}
            <div className="main-content">
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
    );
};

export default RecordsManagement;