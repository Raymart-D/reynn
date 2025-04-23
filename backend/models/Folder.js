// filepath: /workspaces/reynn/backend/models/Folder.js
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., PDF, DOCX
    content: { type: Buffer }, // Optional: Store file content
});

const FolderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null }, // Reference to parent folder
    documents: [DocumentSchema], // Array of documents
});

const Folder = mongoose.model('Folder', FolderSchema);

module.exports = Folder;