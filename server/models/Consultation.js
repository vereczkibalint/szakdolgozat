const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
    lecturer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Oktató megadása kötelező!']
    },
    startTime: {
        type: Date,
        required: [true, 'Kezdés időpontjának megadása kötelező!']
    },
    endTime: {
        type: Date,
        required: [true, 'Befejezés időpontjának megadása kötelező!']
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
});

ConsultationSchema.pre('validate', function(next) {
    if(this.startTime > this.endTime) {
        this.invalidate('endTime', 'A befejezési időpontnak a kezdési időponttól későbbinek kell lennie!')
    }

    next();
});

const populateHook = function(next) {
    this.populate('user', { password: 0 });
    next();
}

ConsultationSchema.pre('find', populateHook).pre('findOne', populateHook);

module.exports = mongoose.model('consultation', ConsultationSchema);