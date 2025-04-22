const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    memoNo: String,
    date: String,
    fileName: String,
    description: String,
    status: String,
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;