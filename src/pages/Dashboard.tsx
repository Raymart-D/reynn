import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            {/* Header Section */}
            <header className="dashboard-header">
                <h1>RECORDS OFFICE MANAGEMENT SYSTEM</h1>
            </header>

            {/* Body Section */}
            <div className="dashboard-body">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Dashboard</h2>
                    <nav>
                        <ul>
                            <li><a href="/dashboard/settings">Settings</a></li>
                            <li><a href="/dashboard/reports">Reports</a></li>
                            <li><a href="/dashboard/records">Manage Records</a></li>
                        </ul>
                    </nav>
                </aside>
                <main className="dashboard-content">
                    <h2>Welcome Back!</h2>
                    <div className="dashboard-widgets">
                        <div className="widget">
                            <h3>Total Records</h3>
                            <p>1,234</p>
                        </div>
                        <div className="widget">
                            <h3>Pending Approvals</h3>
                            <p>12</p>
                        </div>
                        <div className="widget">
                            <h3>Recently Updated</h3>
                            <p>5 records updated today</p>
                        </div>
                    </div>
                    <div className="dashboard-chart">
                        <h3>Monthly Records Overview</h3>
                        <div className="chart-placeholder">[Chart Goes Here]</div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;