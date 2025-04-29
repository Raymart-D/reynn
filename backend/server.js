require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer'); // Import multer for file uploads
const Record = require('./models/Record');
const Folder = require('./models/Folder'); // Import Folder model
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();

// Ensure indexes are created
Folder.collection.createIndex({ parentId: 1 });
Folder.collection.createIndex({ _id: 1 });

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

app.get('/test', (req, res) => {
    res.send('Test route is working!');
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

        // Ensure all documents have valid data
        folder.documents = folder.documents.map((doc) => ({
            ...doc,
            name: doc.name || 'Unnamed Document',
            type: doc.type || 'Unknown Type',
        }));

        res.json(folder);
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
            name: req.file.originalname || 'Unnamed Document', // Default name
            type: req.file.mimetype || 'Unknown Type', // Default type
            content: req.file.buffer,
        };

        folder.documents.push(document);
        await folder.save();

        res.status(201).json(document);
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
    try {
        const folder = await Folder.findById(req.params.folderId);
        if (!folder) return res.status(404).json({ message: 'Folder not found' });

        const document = folder.documents.id(req.params.documentId);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        document.remove(); // Remove the document
        await folder.save();

        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Error deleting document' });
    }
});

// Rename a document in a folder
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

// POST /scan - Trigger a scan
app.post('/scan', async (req, res) => {
    const { resolution, colorMode, duplex } = req.body;

    const scanCommand = `scanimage --resolution ${resolution} --mode ${colorMode} ${duplex ? '--duplex' : ''} --format=png > scanned-document.png`;

    exec(scanCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error scanning document:', error);
            return res.status(500).json({ message: 'Error scanning document' });
        }

        console.log('Scan completed:', stdout);
        res.status(200).json({ message: 'Scan completed', filePath: 'scanned-document.png' });
    });
});

// POST /save-document - Save scanned document
app.post('/save-document', async (req, res) => {
    const { documentName, documentType } = req.body;

    const folderPath = path.join(__dirname, 'uploads', documentType);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const sourcePath = path.join(__dirname, 'scanned-document.png');
    const destinationPath = path.join(folderPath, `${documentName}.png`);

    fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
            console.error('Error saving document:', err);
            return res.status(500).json({ message: 'Error saving document' });
        }

        res.status(200).json({ message: 'Document saved successfully', filePath: destinationPath });
    });
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));