const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
    neptun: {
        type: String,
        required: [true, 'NEPTUN kód megadása kötelező!'],
        validate: {
            validator: function(neptunValue) {
                return neptunValue && neptunValue.length === 6;
            },
            message: 'Hibás NEPTUN kód!'
        } 
    },
    firstName: {
        type: String,
        required: [true, 'Keresztnév megadása kötelező!'],
        validate: {
            validator: function(firstNameValue) {
                return firstNameValue && firstNameValue.length >= 4;
            },
            message: 'A keresztnév legalább 4 karakterből kell álljon!'
        }
    },
    lastName: {
        type: String,
        required: [true, 'Vezetéknév megadása kötelező!'],
        validate: {
            validator: function(lastNameValue) {
                return lastNameValue && lastNameValue.length >= 4;
            },
            message: 'A vezetéknév legalább 4 karakterből kell álljon!'
        }
    },
    username: {
        type: String,
        required: [true, 'Felhasználónév megadása kötelező!'],
        validate: {
            validator: function(usernameValue) {
                return usernameValue && usernameValue.length >= 4;
            },
            message: 'A felhasználónév legalább 4 karakterből kell álljon!'
        }
    },
    password: {
        type: String,
        required: [true, 'Jelszó megadása kötelező!'],
        validate: {
            validator: function(passwordValue) {
                return passwordValue && passwordValue.length >= 8;
            },
            message: 'A jelszó legalább 8 karakterből kell álljon!'
        }
    },
    email: {
        type: String,
        required: [true, 'Email cím megadása kötelező!'],
        validate: {
            validator: function(emailValue) {
                return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue));
            },
            message: 'Hibás email formátum!'
        }
    },
    lastLogin: {
        type: Date
    }
});

LecturerSchema.methods.comparePassword = (passwordText, callback) => {
    return callback(null, bcrypt.compareSync(passwordText, this.password));
}

LecturerSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('lecturer', LecturerSchema);