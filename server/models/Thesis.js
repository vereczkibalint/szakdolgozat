const mongoose = require('mongoose');

const thesisValidator = require('./validators/thesis.validators');

const Schema = mongoose.Schema;

const ThesisSchema = new Schema({
    lecturer: {
        type: Schema.Types.ObjectId,
        ref: 'lecturer',
        required: [true, 'Oktató megadása kötelező!']
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: [true, 'Hallgató megadása kötelező!']
    },
    topic: {
        type: String,
        required: [true, 'Téma megadása kötelező!'],
        validate: {
            validator: thesisValidator.topicLengthValidator,
            message: 'Téma legalább 5 karakterből kell álljon!'
        }
    },
    title: {
        type: String,
        required: [true, 'Cím megadása kötelező!'],
        validate: {
            validator: thesisValidator.titleLengthValidator,
            message: 'Cím legalább 5 karakterből kell álljon!'
        }
    }
});

const populateHook = function(next) {
    this.populate('lecturer', { password: 0 }).populate('student', { password: 0 });
    next();
}

ThesisSchema.pre('find', populateHook).pre('findOne', populateHook);

module.exports = mongoose.model('thesis', ThesisSchema);