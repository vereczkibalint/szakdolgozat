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
        ref: 'student',
        required: [true, 'Hallgató megadása kötelező!']
    },
    reservedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('consultation_reservation', ConsultationReservationSchema);