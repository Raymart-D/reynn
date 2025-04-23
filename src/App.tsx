// filepath: /workspaces/reynn/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RecordsManagement from './pages/RecordsManagement';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/records-management" element={<RecordsManagement />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Dashboard />} /> {/* Default route */}
            </Routes>
        </Router>
    );
};

export default App;