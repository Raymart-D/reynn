import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageRecords.css';

type Document = {
    name: string;
    type: string;
};

type Folder = {
    _id: string;
    name: string;
    parentId: string | null;
    documents: Document[];
};

const RecordsManagement: React.FC = () => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
    const [newFolderName, setNewFolderName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const fetchFolders = async (parentId: string | null = null) => {
        try {
            const response = await axios.get('http://localhost:5000/folders', {
                params: { parentId },
            });
            setFolders(response.data);
        } catch (err) {
            setError('Error fetching folders');
        }
    };

    const handleCreateFolder = async () => {
        try {
            const response = await axios.post('http://localhost:5000/folders', {
                name: newFolderName,
                parentId: currentFolderId,
            });
            setFolders([...folders, response.data]);
            setNewFolderName('');
        } catch (err) {
            setError('Error creating folder');
        }
    };

    const handleRenameFolder = async (id: string, newName: string) => {
        try {
            const response = await axios.put(`http://localhost:5000/folders/${id}`, { name: newName });
            setFolders(folders.map((folder) => (folder._id === id ? response.data : folder)));
        } catch (err) {
            setError('Error renaming folder');
        }
    };

    const handleOpenFolder = (id: string) => {
        setCurrentFolderId(id);
        fetchFolders(id);
    };

    const handleGoBack = () => {
        setCurrentFolderId(null);
        fetchFolders(null);
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    return (
        <div>
            <h1>Records Management</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {currentFolderId && <button onClick={handleGoBack}>Go Back</button>}
                <input
                    type="text"
                    placeholder="New Folder Name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                />
                <button onClick={handleCreateFolder}>Create Folder</button>
            </div>
            <ul>
                {folders.map((folder) => (
                    <li key={folder._id}>
                        <span onClick={() => handleOpenFolder(folder._id)}>{folder.name}</span>
                        <button onClick={() => handleRenameFolder(folder._id, prompt('Enter new name') || folder.name)}>
                            Rename
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecordsManagement;