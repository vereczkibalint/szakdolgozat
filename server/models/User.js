require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const uniqueValidator = require('mongoose-unique-validator');
const userValidators = require('./validators/users.validators');

const {ApiError} = require('../services/errors/ApiError');

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
    }
});

function isNeptunRequired() {
    return this.role != "ADMIN";
}

UserSchema.methods.comparePassword = async function(passwordText) {
    try {
        const match = await bcrypt.compare(passwordText, this.password);

        return match;
    } catch (error) {
        throw new ApiError(500, 'Hiba a belépés közben!');
    }
}

UserSchema.methods.generateJWT = async function() {
    const payload = {
        _id: this._id,
        neptun: this.neptun,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.role
    };

    try {
        const token = jwt.sign(payload, 
                        process.env.JWT_SECRET,
                        { expiresIn: '1d'});

        return token;
    } catch (error) {
        throw new ApiError(500, 'Hiba a token generálása közben!');
    }
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