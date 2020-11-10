const mongoose = require('mongoose');

const commonValidator = require('./validators/common.validators');
const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
    lecturer: {
        type: Schema.Types.ObjectId,
        ref: 'lecturer',
        required: [true, 'Oktató megadása kötelező!'],
        validate: [
            { validator: commonValidator.isValidObjectId, message: 'Hibás oktató azonosító!' }
        ]
    },
    startTime: {
        type: Date,
        required: [true, 'Kezdés időpontjának megadása kötelező!']
    },
    endTime: {
        type: Date,
        required: [true, 'Befejezés időpontjának megadása kötelező!'],
        validate: [
            { validator: function(endTimeValue) {
                return this.startTime < endTimeValue;
            }, message: 'A befejezési időpontnak későbbinek kell lennie a kezdési időponttól!' }
        ]
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
});


module.exports = mongoose.model('consultation', ConsultationSchema);