const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
    lecturer: {
        type: Schema.Types.ObjectId,
        ref: 'lecturer',
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

ConsultationSchema.pre('validate', (next) => {
    if(this.startTime < this.endTime) {
        this.invalidate('endTime', 'A befejezés dátumának a kezdési dátumtól később kell lennie!', this.endTime);
    }
})

module.exports = mongoose.model('consultation', ConsultationSchema);