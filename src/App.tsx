import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import RecordTypes from './pages/RecordTypes';
import Scanner from './pages/Scanner';
import Settings from './pages/Settings';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/records" element={<Records />} />
                        <Route path="/record-types" element={<RecordTypes />} />
                        <Route path="/scanner" element={<Scanner />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;