const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThesisSchema = new Schema({
    lecturer: {
        type: Schema.Types.ObjectId,
        ref: 'lecturer',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('thesis', ThesisSchema);