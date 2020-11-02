const mongoose = require('mongoose');

exports.neptunLengthValidator = (neptunValue) => {
    return neptunValue && neptunValue.length === 6;
}

exports.neptunAlreadyExists = (neptunValue) => {
    mongoose.models['lecturer'].find({ neptun: neptunValue }, (err, result) => {
        return !result;
    });
}

exports.firstNameLengthValidator = (firstNameValue) => {
    return firstNameValue && firstNameValue.length >= 4;
}

exports.lastNameLengthValidator = (lastNameValue) => {
    return lastNameValue && lastNameValue.length >= 4;
}

exports.usernameLengthValidator = (usernameValue) => {
    return usernameValue && usernameValue.length >= 4;
}

exports.passwordLengthValidator = (passwordValue) => {
    return passwordValue && passwordValue.length >= 8;
}

exports.emailRegexValidator = (emailValue) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue));
}