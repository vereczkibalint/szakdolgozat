const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Thesis = require('../models/Thesis');

exports.fetchAll = async () => {
    try {
        const theses = await Thesis.find();
        return theses;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.fetchById = async (thesisId) => {
    try {
        const thesis = await Thesis.findById(thesisId);

        if(!thesis) {
            throw Error('Nincs szakdolgozat ilyen azonosítóval!');
        }

        return thesis;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.create = async (thesis) => {
    try {
        const newThesis = await thesis.save();
        
        return newThesis;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationError = validationErrorHelper.ProcessValidationError(error);
            throw validationError;
        } else {
            throw new Error(error.message);
        }
    }
}

exports.update = async (thesisId, thesis) => {
    try {
        const updatedThesis = await Thesis.findOneAndUpdate(
            { _id: thesisId },
            thesis,
            { new: true, runValidators: true });

        const thesisNotFound = !updatedThesis;

        if(thesisNotFound) {
            throw Error('Nincs szakdolgozat ilyen azonosítóval!');
        }
        
        return updatedThesis.populate('lecturer').populate('student');
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationError = validationErrorHelper.ProcessValidationError(error);
            throw validationError;
        } else {
            throw new Error(error.message);
        }
    }
}

exports.delete = async (thesisId) => {
    try {
        const deletedThesis = await Thesis.findOneAndRemove({ _id: thesisId });
        if(!deletedThesis) {
            throw Error('Nincs szakdolgozat ilyen azonosítóval!');
        }

        return deletedThesis;
    } catch (error) {
        throw Error(error.message);
    }
}