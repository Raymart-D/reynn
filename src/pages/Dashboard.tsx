import React, { useState } from 'react';
import './Dashboard.css';
import logo from '../assets/logo.png';

type Record = {
    id: number;
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

    const [records] = useState<Record[]>([
        { id: 1, memoNo: '9', date: '2025-04-01', fileName: 'Raymart De Guzman', description: 'Request', status: 'Scanned' },
        { id: 2, memoNo: '10', date: '2025-04-02', fileName: 'John Doe', description: 'Approval', status: 'Unscanned' },
        { id: 3, memoNo: '11', date: '2025-04-03', fileName: 'Jane Smith', description: 'Review', status: 'Scanned' },
        { id: 4, memoNo: '12', date: '2025-04-04', fileName: 'Alice Brown', description: 'Submission', status: 'For Filing' },
        { id: 5, memoNo: '13', date: '2025-04-05', fileName: 'Bob White', description: 'Approval', status: 'Scanned' },
        { id: 6, memoNo: '14', date: '2025-04-06', fileName: 'Charlie Black', description: 'Request', status: 'Unscanned' },
    ]);

    // Filtered records based on search and filter criteria
    const filteredRecords = records.filter((record) => {
        const matchesSearch = record.fileName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || record.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Dashboard</h2>
                <nav>
                    <button className="nav-link">Dashboard</button>
                    <button className="nav-link">Records Management</button>
                    <button className="nav-link">Reports</button>
                    <button className="nav-link">Settings</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* User Profile Section */}
                <header className="dashboard-header">
                    <div className="user-profile">
                        <img
                            src={logo} // Use the imported logo
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
                        <p>1234</p>
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
                                <tr key={record.id}>
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
            </div>
        </div>
    );
};

export default Dashboard;