const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const lecturerValidators = require('./validators/lecturer.validators');

const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
    neptun: {
        type: String,
        required: [true, 'NEPTUN kód megadása kötelező!'],
        validate: [
            { validator: lecturerValidators.neptunLengthValidator, message: 'Hibás NEPTUN kód!'},
            { validator: lecturerValidators.neptunAlreadyExists, message: 'Ezzel a NEPTUN kóddal már létezik felhasználó!'}
        ]
    },
    firstName: {
        type: String,
        required: [true, 'Keresztnév megadása kötelező!'],
        validate: {
            validator: lecturerValidators.firstNameLengthValidator,
            message: 'A keresztnév legalább 4 karakterből kell álljon!'
        }
    },
    lastName: {
        type: String,
        required: [true, 'Vezetéknév megadása kötelező!'],
        validate: {
            validator: lecturerValidators.lastNameLengthValidator,
            message: 'A vezetéknév legalább 4 karakterből kell álljon!'
        }
    },
    username: {
        type: String,
        required: [true, 'Felhasználónév megadása kötelező!'],
        validate: {
            validator: lecturerValidators.usernameLengthValidator,
            message: 'A felhasználónév legalább 4 karakterből kell álljon!'
        }
    },
    password: {
        type: String,
        required: [true, 'Jelszó megadása kötelező!'],
        validate: {
            validator: lecturerValidators.passwordLengthValidator,
            message: 'A jelszó legalább 8 karakterből kell álljon!'
        }
    },
    email: {
        type: String,
        required: [true, 'Email cím megadása kötelező!'],
        validate: {
            validator: lecturerValidators.emailRegexValidator,
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