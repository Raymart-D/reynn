import React, { useState } from 'react';
import './ManageRecords.css'; // Import CSS for styling
import styles from './ManageRecords.module.css';

interface File {
    id: number;
    name: string;
    type: string;
}

interface Folder {
    id: number;
    name: string;
    files: File[];
    subfolders: Folder[];
    isOpen: boolean; // Track whether the folder is expanded or collapsed
}

const ManageRecords: React.FC = () => {
    const [folders, setFolders] = useState<Folder[]>([
        {
            id: 1,
            name: 'Manage Records',
            files: [],
            subfolders: [],
            isOpen: true,
        },
    ]);
    const [selectedFolder, setSelectedFolder] = useState<Folder | null>(folders[0]);
    const [newFolderName, setNewFolderName] = useState('');
    const [newFileName, setNewFileName] = useState('');

    // Function to add a new folder
    const addFolder = (parentFolder: Folder | null) => {
        if (newFolderName.trim() === '') {
            alert('Folder name cannot be empty.');
            return;
        }

        const newFolder: Folder = {
            id: Date.now(),
            name: newFolderName,
            files: [],
            subfolders: [],
            isOpen: true,
        };

        if (parentFolder) {
            const updateFolders = (folders: Folder[]): Folder[] =>
                folders.map((folder) => {
                    if (folder.id === parentFolder.id) {
                        return { ...folder, subfolders: [...folder.subfolders, newFolder] };
                    }
                    return { ...folder, subfolders: updateFolders(folder.subfolders) };
                });

            setFolders(updateFolders(folders));
        } else {
            setFolders([...folders, newFolder]);
        }

        setNewFolderName('');
    };

    // Function to add a new file
    const addFile = (parentFolder: Folder) => {
        if (newFileName.trim() === '') {
            alert('File name cannot be empty.');
            return;
        }

        const newFile: File = {
            id: Date.now(),
            name: newFileName,
            type: 'file',
        };

        const updateFolders = (folders: Folder[]): Folder[] =>
            folders.map((folder) => {
                if (folder.id === parentFolder.id) {
                    return { ...folder, files: [...folder.files, newFile] };
                }
                return { ...folder, subfolders: updateFolders(folder.subfolders) };
            });

        setFolders(updateFolders(folders));
        setNewFileName('');
    };

    // Function to toggle folder open/close state
    const toggleFolder = (folderId: number) => {
        const updateFolders = (folders: Folder[]): Folder[] =>
            folders.map((folder) => {
                if (folder.id === folderId) {
                    return { ...folder, isOpen: !folder.isOpen };
                }
                return { ...folder, subfolders: updateFolders(folder.subfolders) };
            });

        setFolders(updateFolders(folders));
    };

    // Recursive function to render the folder tree
    const renderFolderTree = (folders: Folder[]) => {
        return folders.map((folder) => (
            <div key={folder.id} className="folder-tree-item">
                <div
                    className="folder-tree-label"
                    onClick={() => toggleFolder(folder.id)}
                >
                    <span className="folder-icon">{folder.isOpen ? '📂' : '📁'}</span>
                    <span onClick={() => setSelectedFolder(folder)}>{folder.name}</span>
                </div>
                {folder.isOpen && renderFolderTree(folder.subfolders)}
            </div>
        ));
    };

    // Render the contents of the selected folder
    const renderFolderContents = (folder: Folder) => {
        return (
            <div className="folder-contents">
                <h3>{folder.name}</h3>
                <div className="folder-section">
                    <h4>Subfolders</h4>
                    <div className="folder-grid">
                        {folder.subfolders.map((subfolder) => (
                            <div key={subfolder.id} className="folder-item">
                                📁 {subfolder.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="folder-section">
                    <h4>Files</h4>
                    <div className="file-grid">
                        {folder.files.map((file) => (
                            <div key={file.id} className="file-item">
                                📄 {file.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="folder-actions">
                    <input
                        type="text"
                        placeholder="New Subfolder Name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="input"
                    />
                    <button onClick={() => addFolder(folder)} className="button">
                        Add Subfolder
                    </button>
                </div>
                <div className="folder-actions">
                    <input
                        type="text"
                        placeholder="New File Name"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className="input"
                    />
                    <button onClick={() => addFile(folder)} className="button">
                        Add File
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="manage-records">
            {/* Sidebar */}
            <div className="sidebar">
                <h3>Folder Tree</h3>
                {renderFolderTree(folders)}
                <div className="folder-actions">
                    <input
                        type="text"
                        placeholder="New Folder Name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="input"
                    />
                    <button onClick={() => addFolder(null)} className="button">
                        Add Root Folder
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {selectedFolder ? (
                    renderFolderContents(selectedFolder)
                ) : (
                    <h3>Select a folder to view its contents</h3>
                )}
            </div>
        </div>
    );
};

export default ManageRecords;