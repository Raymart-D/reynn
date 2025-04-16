import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Dashboard.css';

const RecordsTable: React.FC = () => {
    return (
        <div className="table-container">
            <h2>Records Table</h2>
            <div className="table-controls">
                <input type="text" placeholder="Search..." className="search-bar" />
                <button className="add-record-button">Add Records for Memorandum</button>
            </div>
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
                        <td>2013</td>
                        <td>Jared Windam</td>
                        <td>Ton_Jacobo</td>
                        <td><button className="download-button">⬇</button></td>
                        <td>
                            <button className="action-button preview">Preview</button>
                            <button className="action-button edit">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="pagination">
                <button className="pagination-button">Previous</button>
                <button className="pagination-button">Next</button>
            </div>
        </div>
    );
};

const MainDashboard: React.FC = () => {
    return (
        <div className="main-dashboard">
            <h2>Welcome to the Records Management System</h2>
            <p>Select a category from the sidebar to view records or manage data.</p>
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
        </div>
    );
};

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Dashboard</h2>
                <nav>
                    <Link to="/dashboard">Home</Link> {/* Home Button */}
                    <Link to="/dashboard/memorandum">Memorandum</Link>
                    <Link to="/dashboard/communication-for-students">Communication for Students</Link>
                    <Link to="/dashboard/resolution">Resolution</Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<MainDashboard />} />
                    <Route path="memorandum" element={<RecordsTable />} />
                    <Route path="communication-for-students" element={<RecordsTable />} />
                    <Route path="resolution" element={<RecordsTable />} />
                    <Route path="*" element={<h2>Page Not Found</h2>} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;