import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecordsManagement: React.FC = () => {
    const [folders, setFolders] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
    const [newFolderName, setNewFolderName] = useState<string>('');

    // Fetch folders and documents
    useEffect(() => {
        const fetchData = async () => {
            try {
                const folderResponse = await axios.get('http://localhost:5000/folders', {
                    params: { parentId: currentFolderId },
                });
                setFolders(folderResponse.data);

                if (currentFolderId) {
                    const currentFolder = await axios.get(`http://localhost:5000/folders/${currentFolderId}`);
                    setDocuments(currentFolder.data.documents);
                } else {
                    setDocuments([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentFolderId]);

    // Handle Rename Document
    const handleRenameDocument = async (documentId: string, currentName: string) => {
        const newName = prompt('Enter the new name for the document:', currentName);
        if (!newName || newName === currentName) return;

        try {
            const response = await axios.put(
                `http://localhost:5000/folders/${currentFolderId}/documents/${documentId}`,
                { name: newName }
            );
            setDocuments(
                documents.map((doc) =>
                    doc._id === documentId ? { ...doc, name: response.data.name } : doc
                )
            );
            alert('Document renamed successfully!');
        } catch (error) {
            console.error('Error renaming document:', error);
            alert('Failed to rename document.');
        }
    };

    return (
        <div>
            <h1>Records Management</h1>

            {/* Folder List */}
            <h3>Folders</h3>
            <ul>
                {folders.map((folder) => (
                    <li key={folder._id}>
                        {folder.name}
                        <button onClick={() => setCurrentFolderId(folder._id)}>Open</button>
                    </li>
                ))}
            </ul>

            {/* Create Folder */}
            <div>
                <input
                    type="text"
                    placeholder="New Folder Name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                />
                <button>Create Folder</button>
            </div>

            {/* Document List */}
            {currentFolderId && (
                <>
                    <h3>Documents</h3>
                    <ul>
                        {documents.map((doc) => (
                            <li key={doc._id}>
                                {doc.name} ({doc.type})
                                <button
                                    onClick={() =>
                                        window.open(
                                            `http://localhost:5000/folders/${currentFolderId}/documents/${doc._id}`
                                        )
                                    }
                                >
                                    View
                                </button>
                                <button onClick={() => handleRenameDocument(doc._id, doc.name)}>
                                    Rename
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default RecordsManagement;