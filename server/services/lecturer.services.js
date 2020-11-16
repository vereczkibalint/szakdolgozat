const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Lecturer = require('../models/Lecturer');

const {ApiError} = require('./errors/ApiError');

exports.fetchAll = async () => {
    try {
        const lecturers = await Lecturer.find().select('-password');
        return lecturers;
    } catch (error) {
        throw new ApiError(400, 'Hiba az oktatók lekérése során!');
    }
}

exports.fetchById = async (lecturerId) => {
    try {
        const lecturer = await Lecturer.findById(lecturerId).select('-password');

        if(!lecturer) {
            throw new ApiError(400, 'Nincs oktató ilyen azonosítóval!');
        }

        return lecturer;
    } catch (error) {
        throw new ApiError(400, 'Hiba az oktató lekérése során!');
    }
}

exports.create = async (lecturer) => {
    try {
        const newLecturer = await lecturer.save();
        
        return newLecturer;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba az oktató létrehozása közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba az oktató létrehozása közben!');
        }
    }
}

exports.update = async (lecturerId, lecturer) => {
    try {
        let updatedLecturer = await Lecturer.findOneAndUpdate(
            { _id: lecturerId },
            lecturer,
            { new: true, runValidators: true, context: 'query' }
        );

        const lecturerNotFound = !updatedLecturer;

        if(lecturerNotFound) {
            throw new ApiError(400, 'Nincs oktató ilyen azonosítóval!');
        }

        return updatedLecturer;
        
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba az oktató frissítése közben!', validationErrors);
        } else {
            throw new ApiError(400, error.message);
        }
    }
}

exports.delete = async (lecturerId) => {
    try {
        const deletedLecturer = await Lecturer.findOneAndRemove({ _id: lecturerId });
        if(!deletedLecturer) {
            throw new ApiError(400, 'Nincs oktató ilyen azonosítóval!');
        }

        return deletedLecturer;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}