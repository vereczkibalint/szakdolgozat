const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Student = require('../models/Student');

exports.fetchAll = async () => {
    try {
        const students = await Student.find();
        return students;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.fetchById = async (studentId) => {
    try {
        const student = await Student.findById(studentId);

        if(!student) {
            throw Error('Nincs hallgató ilyen azonosítóval!');
        }

        return student;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.create = async (student) => {
    try {
        const newStudent = await student.save();
        
        return newStudent;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationError = validationErrorHelper.ProcessValidationError(error);
            throw validationError;
        } else {
            throw new Error(error.message);
        }
    }
}

exports.update = async (studentId, student) => {
    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { _id: studentId },
            student,
            { new: true, runValidators: true });

        const studentNotFound = !updatedStudent;

        if(studentNotFound) {
            throw Error('Nincs hallgató ilyen azonosítóval!');
        }
        
        return updatedStudent;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationError = validationErrorHelper.ProcessValidationError(error);
            throw validationError;
        } else {
            throw new Error(error.message);
        }
    }
}

exports.delete = async (studentId) => {
    try {
        const deletedStudent = await Student.findOneAndRemove({ _id: studentId });
        if(!deletedStudent) {
            throw Error('Nincs hallgató ilyen azonosítóval!');
        }

        return deletedStudent;
    } catch (error) {
        throw Error(error.message);
    }
}