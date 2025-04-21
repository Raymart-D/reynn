import React, { useState } from 'react';
import './ManageRecords.css';

type Folder = {
    id: number;
    name: string;
    subfolders: Folder[];
    documents: string[];
};

const RecordsManagement: React.FC = () => {
    const [folders, setFolders] = useState<Folder[]>([
        { id: 1, name: 'Scanned (Inter-office Received)', subfolders: [], documents: [] },
        { id: 2, name: 'Scanned (Inter-office Released)', subfolders: [], documents: [] },
        { id: 3, name: 'Scanned (Outgoing)', subfolders: [], documents: [] },
        { id: 4, name: 'For Notes (Everyday Folder)', subfolders: [], documents: [] },
        { id: 5, name: 'For Dissemination (Everyday Folder)', subfolders: [], documents: [] },
    ]);

    const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);

    const handleAddFolder = (parentFolder: Folder | null) => {
        const newFolderName = prompt('Enter the name of the new folder:');
        if (!newFolderName) {
            console.log('Folder creation canceled or invalid name entered.');
            return;
        }

        const newFolder: Folder = { id: Date.now(), name: newFolderName, subfolders: [], documents: [] };

        if (parentFolder) {
            // Add subfolder to the current folder
            parentFolder.subfolders.push(newFolder);
            setFolders([...folders]); // Trigger state update
            console.log(`Added subfolder "${newFolderName}" to folder "${parentFolder.name}"`);
        } else {
            // Add folder to the root
            setFolders([...folders, newFolder]);
            console.log(`Added new root folder: "${newFolderName}"`);
        }
    };

    const handleRenameFolder = (folder: Folder) => {
        const newName = prompt('Enter the new name for the folder:', folder.name);
        if (newName) {
            const renameFolder = (folders: Folder[]): Folder[] =>
                folders.map((f) =>
                    f.id === folder.id
                        ? { ...f, name: newName }
                        : { ...f, subfolders: renameFolder(f.subfolders) }
                );
            setFolders((prevFolders) => renameFolder(prevFolders));
        }
    };

    const handleDeleteFolder = (folder: Folder) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the folder "${folder.name}"?`);
        if (confirmDelete) {
            const deleteFolder = (folders: Folder[]): Folder[] =>
                folders.filter((f) => f.id !== folder.id).map((f) => ({
                    ...f,
                    subfolders: deleteFolder(f.subfolders),
                }));
            setFolders((prevFolders) => deleteFolder(prevFolders));
            setCurrentFolder(null);
        }
    };

    const handleUploadFile = (folder: Folder) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.onchange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                const file = target.files[0];
                const fileName = file.name;

                // Add the file name to the folder's documents array
                const addFileToFolder = (folders: Folder[]): Folder[] =>
                    folders.map((f) =>
                        f.id === folder.id
                            ? { ...f, documents: [...f.documents, fileName] }
                            : { ...f, subfolders: addFileToFolder(f.subfolders) }
                    );

                setFolders((prevFolders) => addFileToFolder(prevFolders));
                console.log(`Uploaded file "${fileName}" to folder "${folder.name}"`);
            }
        };
        fileInput.click();
    };

    const openFolder = (folder: Folder) => {
        setCurrentFolder(folder);
    };

    const goBack = () => {
        setCurrentFolder(null);
    };

    const renderFolderContents = (folder: Folder) => (
        <div className="folder-contents">
            <h2>{folder.name}</h2>
            <button className="add-folder-button" onClick={() => handleAddFolder(folder)}>
                Add Subfolder
            </button>
            <button className="rename-folder-button" onClick={() => handleRenameFolder(folder)}>
                Rename Folder
            </button>
            <button className="delete-folder-button" onClick={() => handleDeleteFolder(folder)}>
                Delete Folder
            </button>
            {/* Only show "Upload File" if the folder has no subfolders */}
            {folder.subfolders.length === 0 && (
                <button className="upload-file-button" onClick={() => handleUploadFile(folder)}>
                    Upload File
                </button>
            )}
            <ul className="subfolder-list">
                {folder.subfolders.map((subfolder) => (
                    <li key={subfolder.id} className="subfolder-item">
                        <span onClick={() => openFolder(subfolder)}>📂 {subfolder.name}</span>
                    </li>
                ))}
            </ul>
            <ul className="document-list">
                {folder.documents.map((doc, index) => (
                    <li key={index} className="document-item">
                        📄 {doc}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="manage-records">
            <h1>Records Management</h1>
            {currentFolder ? (
                <div>
                    <button className="go-back-button" onClick={goBack}>
                        Go Back
                    </button>
                    {renderFolderContents(currentFolder)}
                </div>
            ) : (
                <div className="classification">
                    <h2>Classification of Records</h2>
                    <div className="classification-cards">
                        {folders.map((folder) => (
                            <div key={folder.id} className="classification-card">
                                <div className="icon">📁</div>
                                <h3 onClick={() => openFolder(folder)}>{folder.name}</h3>
                            </div>
                        ))}
                    </div>
                    <button className="add-folder-button" onClick={() => handleAddFolder(null)}>
                        Add New Folder
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecordsManagement;