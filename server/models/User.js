const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uniqueValidator = require('mongoose-unique-validator');
const userValidators = require('./validators/users.validators');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    neptun: {
        type: String,
        required: [isNeptunRequired, 'NEPTUN kód megadása kötelező!'],
        validate: [
            { validator: userValidators.neptunLengthValidator, message: 'Hibás NEPTUN kód!'}
        ],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, 'Keresztnév megadása kötelező!'],
        validate: {
            validator: userValidators.firstNameLengthValidator,
            message: 'A keresztnév legalább 4 karakterből kell álljon!'
        }
    },
    lastName: {
        type: String,
        required: [true, 'Vezetéknév megadása kötelező!'],
        validate: {
            validator: userValidators.lastNameLengthValidator,
            message: 'A vezetéknév legalább 4 karakterből kell álljon!'
        }
    },
    password: {
        type: String,
        required: [true, 'Jelszó megadása kötelező!'],
        validate: {
            validator: userValidators.passwordLengthValidator,
            message: 'A jelszó legalább 8 karakterből kell álljon!'
        }
    },
    email: {
        type: String,
        required: [true, 'Email cím megadása kötelező!'],
        validate: {
            validator: userValidators.emailRegexValidator,
            message: 'Hibás email formátum!'
        },
        unique: true
    },
    role: {
        type: String,
        enum: ['STUDENT','LECTURER','ADMIN'],
        required: [true, 'Jogosultság megadása kötelező!'],
        default: 'STUDENT'
    },
    lastLogin: {
        type: Date
    }
});

function isNeptunRequired() {
    return this.role != "ADMIN";
}

UserSchema.methods.comparePassword = (passwordText, callback) => {
    return callback(null, bcrypt.compareSync(passwordText, this.password));
}

UserSchema.pre('findOneAndUpdate', function(next) {
    if(!this._update.password) {
        return next();
    }

    this._update.password = bcrypt.hashSync(this._update.password, 10);
    next();
});

UserSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.plugin(uniqueValidator, { message: 'A(z) {VALUE} már használatban van!' });

module.exports = mongoose.model('user', UserSchema);