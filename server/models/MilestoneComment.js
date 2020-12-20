const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MilestoneCommentSchema = new Schema({
    milestone: {
        type: Schema.Types.ObjectId,
        ref: 'milestone',
        required: [true, 'Mérföldkő megadása kötelező!']
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, 'Szerző megadása kötelező!'],
        ref: 'user'
    },
    message: {
        type: String,
        required: [true, 'Üzenet megadása kötelező!'],
        validate: {
            validator: function(messageValue) {
                return messageValue && messageValue.length > 5;
            },
            message: 'Az üzenet legalább 5 karakterből kell álljon!'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('milestone_comment', MilestoneCommentSchema);