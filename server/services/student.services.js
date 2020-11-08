const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Student = require('../models/Student');
const {ApiError} = require('./errors/ApiError');

exports.fetchAll = async () => {
    try {
        const students = await Student.find().select('-password');
        return students;
    } catch (error) {
        throw new ApiError(400, 'Hiba a hallgatók lekérése közben!');
    }
}

exports.fetchById = async (studentId) => {
    try {
        const student = await Student.findById(studentId).select('-password');

        if(!student) {
            throw new ApiError(400, 'Nincs hallgató ilyen azonosítóval!');
        }

        return student;
    } catch (error) {
        throw new ApiError(400, 'Hiba a hallgatók lekérése közben!');
    }
}

exports.create = async (student) => {
    try {
        const newStudent = await student.save();
        
        return newStudent;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a hallgató létrehozása közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba a hallgató létrehozása közben!');
        }
    }
}

exports.update = async (studentId, student) => {
    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { _id: studentId },
            student,
            { new: true, runValidators: true, context: 'query' });

        const studentNotFound = !updatedStudent;

        if(studentNotFound) {
            throw new ApiError(400, 'Nincs hallgató ilyen azonosítóval!');
        }
        
        return updatedStudent;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a hallgató frissítése közben!', validationErrors);
        } else {
            throw new ApiError(400, error.message);
        }
    }
}

exports.delete = async (studentId) => {
    try {
        const deletedStudent = await Student.findOneAndRemove({ _id: studentId });
        if(!deletedStudent) {
            throw new ApiError(400, 'Nincs hallgató ilyen azonosítóval!');
        }

        return deletedStudent;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}