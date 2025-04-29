import React from 'react';
import './Scanner.css';

const Scanner: React.FC = () => {
    return (
        <div className="scanner">
            <h1>Scanner Integration</h1>
            <div className="scanner-info">
                <p>Model: Brother ADS-2400N</p>
                <p>Type: Desktop Scanner</p>
                <p>Resolution: 600 x 600 DPI</p>
                <p>Interface: USB, Wired Network</p>
            </div>
            <div className="scanner-controls">
                <button>Retry</button>
                <button>Go to Scanner Connection</button>
            </div>
            <div className="scan-history">
                <h2>Recent Scan History</h2>
                <ul>
                    <li>Invoice #1234 - Completed</li>
                    <li>Contract Agreement - Completed</li>
                    <li>Expense Receipt - Pending</li>
                </ul>
            </div>
        </div>
    );
};

export default Scanner;