import React, { useState, useEffect } from 'react';
import './Reports.css';

const Reports: React.FC = () => {
    const [reports, setReports] = useState<string[]>([]);

    useEffect(() => {
        // Simulate fetching data from the backend
        const fetchReports = async () => {
            const mockReports = ['Report A', 'Report B', 'Report C'];
            setReports(mockReports);
        };

        fetchReports();
    }, []);

    return (
        <div>
            <h1>Reports</h1>
            <ul>
                {reports.map((report, index) => (
                    <li key={index}>{report}</li>
                ))}
            </ul>
        </div>
    );
};

export default Reports;