import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    return (
        <div className="dashboard">
            {/* Main Content */}
            <div className="main-content">
                <h2>Records Table</h2>
                <div className="table-container">
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
            </div>

            {/* Sidebar */}
            <div className="sidebar">
                <h2>Dashboard</h2>
                <div className="menu">
                    <div className="menu-item" onClick={() => toggleMenu('records')}>
                        Records
                        <div className={`submenu ${activeMenu === 'records' ? 'open' : ''}`}>
                            <a href="#">Memorandum</a>
                            <a href="#">Communication for Administration</a>
                            <a href="#">Communication for Students</a>
                            <a href="#">Resolution</a>
                            <a href="#">External Communication</a>
                            <a href="#">Project Proposal</a>
                            <a href="#">Student Practicum</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;