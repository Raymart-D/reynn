const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Sample records (in-memory for now)
let records = [
    { id: 1, memoNo: '9', date: '2025-04-01', fileName: 'Raymart De Guzman', description: 'Request', status: 'Scanned' },
    { id: 2, memoNo: '10', date: '2025-04-02', fileName: 'John Doe', description: 'Approval', status: 'Unscanned' },
    { id: 3, memoNo: '11', date: '2025-04-03', fileName: 'Jane Smith', description: 'Review', status: 'Scanned' },
];

// GET /records - Fetch all records
app.get('/records', (req, res) => {
    res.json(records);
});

// POST /records - Add a new record
app.post('/records', (req, res) => {
    const newRecord = req.body;
    newRecord.id = records.length + 1; // Generate a new ID
    records.push(newRecord);
    res.status(201).json(newRecord);
});

// PUT /records/:id - Update a record
app.put('/records/:id', (req, res) => {
    const recordId = parseInt(req.params.id);
    const updatedRecord = req.body;

    const recordIndex = records.findIndex((record) => record.id === recordId);
    if (recordIndex !== -1) {
        records[recordIndex] = { ...records[recordIndex], ...updatedRecord };
        res.json(records[recordIndex]);
    } else {
        res.status(404).json({ message: 'Record not found' });
    }
});

// DELETE /records/:id - Delete a record
app.delete('/records/:id', (req, res) => {
    const recordId = parseInt(req.params.id);
    const recordIndex = records.findIndex((record) => record.id === recordId);

    if (recordIndex !== -1) {
        const deletedRecord = records.splice(recordIndex, 1);
        res.json(deletedRecord);
    } else {
        res.status(404).json({ message: 'Record not found' });
    }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));