require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer'); // Import multer for file uploads
const Record = require('./models/Record');
const Folder = require('./models/Folder'); // Import Folder model

const app = express();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory as a buffer
const upload = multer({ storage });

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

app.get('/folders/:id', async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        res.json(folder); // Include the documents array in the response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching folder' });
    }
});

app.put('/folders/:id', async (req, res) => {
    // Rename a folder
});

app.post('/folders/:id/documents', upload.single('file'), async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        const document = {
            name: req.file.originalname, // Use the original file name
            type: req.file.mimetype,
            content: req.file.buffer,
        };

        folder.documents.push(document);
        await folder.save();

        res.status(201).json(document); // Return the newly added document
    } catch (error) {
        res.status(500).json({ message: 'Error adding document' });
    }
});

app.get('/folders/:folderId/documents/:documentId', async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.folderId);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        const document = folder.documents.id(req.params.documentId);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        res.set('Content-Type', document.type);
        res.send(document.content);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document' });
    }
});

app.delete('/folders/:folderId/documents/:documentId', async (req, res) => {
    // Delete a document from a folder
});

app.put('/folders/:folderId/documents/:documentId', async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.folderId);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        const document = folder.documents.id(req.params.documentId);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        document.name = req.body.name; // Update the document name
        await folder.save();

        res.json(document); // Return the updated document
    } catch (error) {
        res.status(500).json({ message: 'Error renaming document' });
    }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));