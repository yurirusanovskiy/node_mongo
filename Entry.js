const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50,
        required: true
    },
    body: {
        type: String,
        maxlength: 5000,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model("Entry", entrySchema);
