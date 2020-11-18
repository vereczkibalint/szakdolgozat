const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConsultationReservationSchema = new Schema({
    consultation: {
        type: Schema.Types.ObjectId,
        ref: 'consultation',
        required: [true, 'Konzultáció megadása kötelező!']
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Hallgató megadása kötelező!']
    },
    reservedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const populateHook = function(next) {
    this.populate('consultation').populate('student', { password: 0 });
    next();
}

ConsultationReservationSchema.pre('find', populateHook).pre('findOne', populateHook);

module.exports = mongoose.model('consultation_reservation', ConsultationReservationSchema);