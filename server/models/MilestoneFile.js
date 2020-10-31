const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MilestoneFileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('milestone_file', MilestoneFileSchema);