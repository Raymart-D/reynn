import React from 'react';
import './RecordsManagement.css';

const RecordsManagement: React.FC = () => {
    return (
        <div className="records-management">
            <header className="records-header">
                <h1>Records Office Management System</h1>
                <p>Manage and organize your records efficiently.</p>
            </header>

            {/* Navigation Tabs */}
            <div className="tabs">
                <button className="tab active">All Records</button>
                <button className="tab">Pending Records</button>
                <button className="tab">Archived Records</button>
            </div>

            {/* Records Table */}
            <div className="records-table-container">
                <h2>Records List</h2>
                <table className="records-table">
                    <thead>
                        <tr>
                            <th>Record ID</th>
                            <th>Title</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Annual Report 2025</td>
                            <td>April 1, 2025</td>
                            <td>Active</td>
                            <td>
                                <button className="action-button view">View</button>
                                <button className="action-button edit">Edit</button>
                                <button className="action-button archive">Archive</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Meeting Minutes</td>
                            <td>March 15, 2025</td>
                            <td>Pending</td>
                            <td>
                                <button className="action-button view">View</button>
                                <button className="action-button edit">Edit</button>
                                <button className="action-button archive">Archive</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecordsManagement;