import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentManagement: React.FC = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await axios.get('http://localhost:5000/documents');
            setDocuments(response.data);
        };

        fetchDocuments();
    }, []);

    return (
        <div>
            <h1>Document Management</h1>
            <ul>
                {documents.map((doc: any) => (
                    <li key={doc.id}>
                        {doc.name} - {doc.type}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentManagement;