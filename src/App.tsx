// filepath: /workspaces/reynn/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import ManageRecords from './pages/ManageRecords';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to /login */}
                <Route path="/dashboard/settings" element={<Settings />} />
                <Route path="/dashboard/reports" element={<Reports />} />
                <Route path="/dashboard/records" element={<ManageRecords />} />
                <Route path="/dashboard" element={<Navigate to="/dashboard/settings" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;