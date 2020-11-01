const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThesisVersionSchema = new Schema({
    thesis: {
        type: Schema.Types.ObjectId,
        ref: 'thesis',
        required: [true, 'Szakdolgozat megadása kötelező!']
    }
}, { timestamps: true });

module.exports = mongoose.model('thesis_version', ThesisVersionSchema);