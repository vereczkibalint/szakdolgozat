const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const User = require('../models/User');

const {ApiError} = require('./errors/ApiError');

exports.fetchAll = async () => {
    try {
        const users = await User.find().select('-password');
        return users;
    } catch (error) {
        throw new ApiError(400, 'Hiba a felhasználók lekérése során!');
    }
}

exports.fetchById = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');

        if(!user) {
            throw new ApiError(400, 'Nincs felhasználó ilyen azonosítóval!');
        }

        return user;
    } catch (error) {
        throw new ApiError(400, 'Hiba a felhasználó lekérése során!');
    }
}

exports.fetchByRole = async (role) => {
    try {
        const result = await User.find({ role }).select('-password');

        return result;
    } catch (error) {
        throw new ApiError(400, 'Hiba a felhasználók lekérése során!');
    }
}

exports.create = async (user) => {
    try {
        const newUser = await user.save();
        
        return newUser;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a felhasználó létrehozása közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba a felhasználó létrehozása közben!');
        }
    }
}

exports.update = async (userId, user) => {
    try {
        let updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            user,
            { new: true, runValidators: true, context: 'query' }
        );

        const userNotFound = !updatedUser;

        if(userNotFound) {
            throw new ApiError(400, 'Nincs felhasználó ilyen azonosítóval!');
        }

        return updatedUser;
        
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a felhasználó frissítése közben!', validationErrors);
        } else {
            throw new ApiError(400, error.message);
        }
    }
}

exports.delete = async (userId) => {
    try {
        const deletedUser = await User.findOneAndRemove({ _id: userId });
        if(!deletedUser) {
            throw new ApiError(400, 'Nincs felhasználó ilyen azonosítóval!');
        }

        return deletedUser;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}