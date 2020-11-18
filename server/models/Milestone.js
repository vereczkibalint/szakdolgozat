const mongoose = require('mongoose');

const milestoneValidator = require('./validators/milestone.validators');
const Schema = mongoose.Schema;

const MilestoneSchema = new Schema({
    thesis: {
        type: Schema.Types.ObjectId,
        ref: 'thesis',
        required: [true, 'Szakdolgozat megadása kötelező!']
    },
    title: {
        type: String,
        required: [true, 'Cím megadása kötelező!'],
        validate: {
            validator: milestoneValidator.titleLengthValidator,
            message: 'A cím hossza legalább 3 karakterből kell álljon!'
        }
    },
    description: {
        type: String,
        required: [true, 'Leírás megadása kötelező!'],
        validate: {
            validator: milestoneValidator.descriptionLengthValidator,
            message: 'A leírás legalább 5 karakterből kell álljon!'
        }
    },
    deadline: {
        type: Date,
        required: [true, 'Határidő megadása kötelező!'],
        validate: {
            validator: milestoneValidator.deadlineDateValidator,
            message: 'A határidőnek a mai napnál későbbinek kell lennie!'
        }
    },
    status: {
        type: String,
        enum: {
            values: ['accepted', 'rejected', 'pending'],
            message: 'Hibás státusz!'
        },
        default: 'pending'
    }
});

const populateHook = function(next) {
    this.populate('thesis');
    next();
}

MilestoneSchema.pre('find', populateHook).pre('findOne', populateHook);

module.exports = mongoose.model('milestone', MilestoneSchema);