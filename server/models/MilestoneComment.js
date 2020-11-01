const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MilestoneCommentSchema = new Schema({
    milestone: {
        type: Schema.Types.ObjectId,
        ref: 'milestone',
        required: [true, 'Mérföldő megadása kötelező!']
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, 'Szerző megadása kötelező!'],
        /*
            nincs ref, mert nem tudni, hogy lecturer vagy student
            így a populate() hívásnál manuálisan meg lehet mondani, hogy
            honnan kerüljön az adat behúzásra
                MilestoneCommentSchema.
                find().
                populate({ path: 'refnév', model: refModel }).
                exec(function(error, docs) {  }); */
    },
    message: {
        type: String,
        required: [true, 'Üzenet megadása kötelező!'],
        validate: {
            validator: function(messageValue) {
                return messageValue && messageValue.length > 5;
            },
            message: 'Az üzenet legalább 5 karakterből kell álljon!'
        }
    },
    files: [{
        type: Schema.Types.ObjectId,
        ref: 'milestone_file'
    }]
}, { timestamps: true });

module.exports = mongoose.model('milestone_comment', MilestoneCommentSchema);