import React, { useState } from 'react';
import './RecordsManagement.css';

// Define the type for a record
type Record = {
    id: number;
    memoNo: string;
    date: string;
    fileName: string;
    description: string;
    status: string;
};

const RecordsManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All Records');
    const [records, setRecords] = useState<Record[]>([
        { id: 1, memoNo: '9', date: '2025', fileName: 'Raymart De Guzman', description: 'Request', status: 'Active' },
        { id: 2, memoNo: '10', date: '2025', fileName: 'John Doe', description: 'Approval', status: 'Pending' },
    ]);

    const [archivedRecords, setArchivedRecords] = useState<Record[]>([]); // Explicitly define the type
    const [showAddForm, setShowAddForm] = useState(false);
    const [newRecord, setNewRecord] = useState<Record>({
        id: 0,
        memoNo: '',
        date: '',
        fileName: '',
        description: '',
        status: 'Active',
    });

    const handleAddRecord = () => {
        const newId = records.length + 1; // Generate a new unique ID
        setRecords([...records, { ...newRecord, id: newId }]); // Explicitly set the ID
        setShowAddForm(false);
        setNewRecord({ id: 0, memoNo: '', date: '', fileName: '', description: '', status: 'Active' }); // Reset the form
    };

    const handleArchiveRecord = (id: number) => {
        const recordToArchive = records.find((record) => record.id === id);
        if (recordToArchive) {
            setArchivedRecords([...archivedRecords, recordToArchive]);
            setRecords(records.filter((record) => record.id !== id));
        }
    };

    const renderRecords = () => {
        const data = activeTab === 'All Records' ? records : archivedRecords;
        return (
            <table className="records-table">
                <thead>
                    <tr>
                        <th>Memo No.</th>
                        <th>Date</th>
                        <th>File Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        {activeTab === 'All Records' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((record) => (
                        <tr key={record.id}>
                            <td>{record.memoNo}</td>
                            <td>{record.date}</td>
                            <td>{record.fileName}</td>
                            <td>{record.description}</td>
                            <td>{record.status}</td>
                            {activeTab === 'All Records' && (
                                <td>
                                    <button
                                        className="action-button archive"
                                        onClick={() => handleArchiveRecord(record.id)}
                                    >
                                        Archive
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="records-management">
            <header className="records-header">
                <h1>Records Management</h1>
            </header>

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'All Records' ? 'active' : ''}`}
                    onClick={() => setActiveTab('All Records')}
                >
                    All Records
                </button>
                <button
                    className={`tab ${activeTab === 'Archived Records' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Archived Records')}
                >
                    Archived Records
                </button>
            </div>

            {/* Add Record Button */}
            {activeTab === 'All Records' && (
                <button className="add-record-button" onClick={() => setShowAddForm(true)}>
                    Add New Record
                </button>
            )}

            {/* Add Record Form */}
            {showAddForm && (
                <div className="add-record-form">
                    <h3>Add New Record</h3>
                    <input
                        type="text"
                        placeholder="Memo No."
                        value={newRecord.memoNo}
                        onChange={(e) => setNewRecord({ ...newRecord, memoNo: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Date"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="File Name"
                        value={newRecord.fileName}
                        onChange={(e) => setNewRecord({ ...newRecord, fileName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newRecord.description}
                        onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                    />
                    <select
                        value={newRecord.status}
                        onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
                    >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <button onClick={handleAddRecord}>Save</button>
                    <button onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
            )}

            {/* Records Table */}
            <div className="records-table-container">
                <h2>{activeTab}</h2>
                {renderRecords()}
            </div>
        </div>
    );
};

export default RecordsManagement;