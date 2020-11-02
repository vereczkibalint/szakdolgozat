const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Lecturer = require('../models/Lecturer');

exports.fetchAll = async () => {
    try {
        const lecturers = await Lecturer.find();
        return lecturers;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.fetchById = async (lecturerId) => {
    try {
        const lecturer = await Lecturer.findById(lecturerId);

        if(!lecturer) {
            throw Error('Nincs oktató ilyen azonosítóval!');
        }

        return lecturer;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.create = async (lecturer) => {
    try {
        const newLecturer = await lecturer.save();
        
        return newLecturer;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationError = validationErrorHelper.ProcessValidationError(error);

            throw validationError;
        } else {
            throw new Error(error.message);
        }
    }
}

exports.update = async (lecturerId, lecturer) => {
    try {
        const updatedLecturer = await Lecturer.findOneAndUpdate(
            { _id: lecturerId },
            lecturer,
            { new: true, runValidators: true });

        const lecturerNotFound = !updatedLecturer;

        if(lecturerNotFound) {
            throw Error('Nincs oktató ilyen azonosítóval!');
        }
        
        return updatedLecturer;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationError = validationErrorHelper.ProcessValidationError(error);
            throw validationError;
        } else {
            throw new Error(error.message);
        }
    }
}

exports.delete = async (lecturerId) => {
    try {
        const deletedLecturer = await Lecturer.findOneAndRemove({ _id: lecturerId });
        if(!deletedLecturer) {
            throw Error('Nincs oktató ilyen azonosítóval!');
        }

        return deletedLecturer;
    } catch (error) {
        throw Error(error.message);
    }
}