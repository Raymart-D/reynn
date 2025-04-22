import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';
import logo from '../assets/logo.png';

const notify = (message: string) => {
    toast.success(message);
};

type Record = {
    _id: string; // Updated to match MongoDB's default `_id` field
    memoNo: string;
    date: string;
    fileName: string;
    description: string;
    status: string;
};

const Dashboard: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const [records, setRecords] = useState<Record[]>([]);

    // Fetch records from the backend
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:5000/records'); // Backend endpoint
                setRecords(response.data); // Set the fetched records
            } catch (error) {
                console.error('Error fetching records:', error);
                toast.error('Failed to fetch records from the server.');
            }
        };

        fetchRecords();
    }, []);

    const filteredRecords = records.filter((record) => {
        const fileName = record.fileName || 'Unknown File'; // Fallback value
        const matchesSearch = fileName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || record.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleFileUpload = () => {
        notify('File uploaded successfully!');
        // File upload logic...
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Dashboard</h2>
                <nav>
                    <Link to="/dashboard">
                        <button className="nav-link">Dashboard</button>
                    </Link>
                    <Link to="/dashboard/records-management">
                        <button className="nav-link">Records Management</button>
                    </Link>
                    <Link to="/dashboard/reports">
                        <button className="nav-link">Reports</button>
                    </Link>
                    <Link to="/dashboard/settings">
                        <button className="nav-link">Settings</button>
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* User Profile Section */}
                <header className="dashboard-header">
                    <div className="user-profile">
                        <img
                            src={logo}
                            alt="User Avatar"
                            className="user-avatar"
                        />
                        <div className="user-info">
                            <p>Welcome, Admin</p>
                            <button className="logout-button">Logout</button>
                        </div>
                    </div>
                    <h1>Records Office Management System</h1>
                </header>

                {/* Cards Section */}
                <div className="card-container">
                    <div className="card">
                        <h3>Total Records</h3>
                        <p>{records.length}</p>
                    </div>
                    <div className="card">
                        <h3>Pending Approvals</h3>
                        <p>{records.filter((record) => record.status === 'Pending').length}</p>
                    </div>
                    <div className="card">
                        <h3>Recently Updated</h3>
                        <p>5 records updated today</p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Search by File Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-dropdown"
                    >
                        <option value="All">All</option>
                        <option value="Scanned">Scanned</option>
                        <option value="Unscanned">Unscanned</option>
                        <option value="For Filing">For Filing</option>
                    </select>
                </div>

                {/* Records Table */}
                <div className="table">
                    <h3>Records List</h3>
                    <table className="records-table">
                        <thead>
                            <tr>
                                <th>Memo No.</th>
                                <th>Date</th>
                                <th>File Name</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((record) => (
                                <tr key={record._id}>
                                    <td>{record.memoNo}</td>
                                    <td>{record.date}</td>
                                    <td>{record.fileName}</td>
                                    <td>{record.description}</td>
                                    <td>{record.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* Activity Logs */}
                <div className="activity-logs">
                    <h3>Activity Logs</h3>
                    <ul>
                        {['User logged in', 'File uploaded', 'Record updated', 'User logged out'].map((log, index) => (
                            <li key={index}>{log}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default Dashboard;