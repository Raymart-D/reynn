const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: Buffer, required: true },
});

const folderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
    documents: [documentSchema], // Array of subdocuments
});

module.exports = mongoose.model('Folder', folderSchema);