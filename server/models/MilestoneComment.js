const mongoose = require('mongoose');
const { messageLengthValidator } = require('./validators/milestone_comment.validators');
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
        validate: [
            { validator: messageLengthValidator, message: 'Az üzenet legalább 5 karakterből kell álljon!' }
        ]
    }
}, { timestamps: true });

const populateHook = function(next) {
    this.populate('milestone').populate('author');
    next();
}

MilestoneCommentSchema.pre('find', populateHook).pre('findOne', populateHook);

module.exports = mongoose.model('milestone_comment', MilestoneCommentSchema);