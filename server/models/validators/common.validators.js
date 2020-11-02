const mongoose = require('mongoose');

exports.isValidObjectId = (value) => {
    return mongoose.Types.ObjectId.isValid(value); 
}