const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MilestoneFileSchema = new Schema({
    fileName: {
        type: String,
        required: [true, 'Fájlnév megadása kötelező!'],
        validate: {
            validator: function(fileNameValue) {
                return fileNameValue && fileNameValue.length < 3;
            },
            message: 'A fájlnév legalább 3 karakterből kell álljon!'
        }
    },
    path: {
        type: String,
        required: [true, 'Fájl elérési útjának megadása kötelező!']
    }
});

module.exports = mongoose.model('milestone_file', MilestoneFileSchema);