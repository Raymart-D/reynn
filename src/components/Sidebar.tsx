import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <h2>RecordsVault</h2>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Dashboard
            </NavLink>
            <NavLink to="/records" className={({ isActive }) => (isActive ? 'active' : '')}>
                Records
            </NavLink>
            <NavLink to="/record-types" className={({ isActive }) => (isActive ? 'active' : '')}>
                Record Types
            </NavLink>
            <NavLink to="/scanner" className={({ isActive }) => (isActive ? 'active' : '')}>
                FileScan
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
                Settings
            </NavLink>
            <button className="btn-primary">View Documentation</button>
        </div>
    );
};

export default Sidebar;