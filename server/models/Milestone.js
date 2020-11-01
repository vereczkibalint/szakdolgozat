const mongoose = require('mongoose');

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
            validator: function(titleValue) {
                return titleValue && titleValue.length > 3;
            },
            message: 'A cím hossza legalább 3 karakterből kell álljon!'
        }
    },
    description: {
        type: String,
        required: [true, 'Leírás megadása kötelező!'],
        validate: {
            validator: function(descriptionValue) {
                return descriptionValue && descriptionValue.length > 5;
            },
            message: 'A leírás legalább 5 karakterből kell álljon!'
        }
    },
    deadline: {
        type: Date,
        required: [true, 'Határidő megadása kötelező!'],
        validate: {
            validator: function(deadlineValue) {
                let today = new Date();
                return deadlineValue && deadlineValue > today;
            },
            message: 'A határidőnek a mai napnál későbbinek kell lennie!'
        }
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected', 'pending']
    }
});

module.exports = mongoose.model('milestone', MilestoneSchema);