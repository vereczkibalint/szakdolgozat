const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MilestoneSchema = new Schema({
    thesis: {
        type: Schema.Types.ObjectId,
        ref: 'thesis',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected', 'pending']
    }
});

module.exports = mongoose.model('milestone', MilestoneSchema);