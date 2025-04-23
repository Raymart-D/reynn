require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Record = require('./models/Record');
const Folder = require('./models/Folder'); // Import Folder model

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// GET /records - Fetch all records
app.get('/records', async (req, res) => {
    try {
        const records = await Record.find();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching records' });
    }
});

// POST /records - Add a new record
app.post('/records', async (req, res) => {
    try {
        const newRecord = new Record(req.body);
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error adding record' });
    }
});

// PUT /records/:id - Update a record
app.put('/records/:id', async (req, res) => {
    try {
        const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error updating record' });
    }
});

// DELETE /records/:id - Delete a record
app.delete('/records/:id', async (req, res) => {
    try {
        const deletedRecord = await Record.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(deletedRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting record' });
    }
});

// Folder Routes
app.post('/folders', async (req, res) => {
    try {
        const folder = new Folder(req.body);
        await folder.save();
        res.status(201).json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating folder' });
    }
});

app.get('/folders', async (req, res) => {
    try {
        const { parentId } = req.query;
        const folders = await Folder.find({ parentId: parentId || null });
        res.json(folders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching folders' });
    }
});

app.put('/folders/:id', async (req, res) => {
    try {
        const folder = await Folder.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!folder) return res.status(404).json({ message: 'Folder not found' });
        res.json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Error renaming folder' });
    }
});

app.post('/folders/:id/documents', async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        folder.documents.push(req.body); // Add the document to the folder
        await folder.save();
        res.status(201).json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Error adding document' });
    }
});

app.delete('/folders/:folderId/documents/:documentId', async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.folderId);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        folder.documents = folder.documents.filter(doc => doc._id.toString() !== req.params.documentId);
        await folder.save();
        res.json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document' });
    }
});

app.delete('/folders/:id', async (req, res) => {
    try {
        const folder = await Folder.findByIdAndDelete(req.params.id);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });
        res.json(folder);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting folder' });
    }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));