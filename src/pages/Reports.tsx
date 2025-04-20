import React from 'react';

const Reports: React.FC = () => {
    const reports = [
        { id: 1, title: 'Monthly Report - March 2025', date: 'March 31, 2025' },
        { id: 2, title: 'Annual Report - 2024', date: 'December 31, 2024' },
    ];

    const handleViewReport = (id: number) => {
        alert(`Viewing report with ID: ${id}`);
    };

    return (
        <div className="reports">
            <h1>Reports</h1>
            <table>
                <thead>
                    <tr>
                        <th>Report Title</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                            <td>
                                <button onClick={() => handleViewReport(report.id)}>
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;