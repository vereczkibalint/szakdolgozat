const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Thesis = require('../models/Thesis');
const { ApiError } = require('./errors/ApiError');

exports.fetchAll = async () => {
    try {
        const theses = await Thesis.find();
        return theses;
    } catch (error) {
        throw new ApiError(400, 'Hiba az szakdolgozatok lekérése során!');
    }
}

exports.fetchById = async (thesisId) => {
    try {
        const thesis = await Thesis.findById(thesisId);

        if(!thesis) {
            throw ApiError(400, 'Nincs szakdolgozat ilyen azonosítóval!');
        }

        return thesis;
    } catch (error) {
        throw new ApiError(400, 'Hiba a szakdolgozat lekérése közben!');
    }
}

exports.create = async (thesis) => {
    try {
        const newThesis = await thesis.save();
        
        return await newThesis.populate('student', { password: 0 }).populate('lecturer', { password: 0 }).execPopulate();
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a szakdolgozat létrehozása közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba a szakdolgozat létrehozása közben!');
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
            throw new ApiError(400, 'Nincs szakdolgozat ilyen azonosítóval!');
        }
        
        return updatedThesis.populate('student', { password: 0 }).populate('lecturer', { password: 0 }).execPopulate();
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a szakdolgozat frissítése közben!', validationErrors);
        } else {
            throw new ApiError(400, error.message);
        }
    }
}

exports.delete = async (thesisId) => {
    try {
        const deletedThesis = await Thesis.findOneAndRemove({ _id: thesisId });
        if(!deletedThesis) {
            throw new ApiError(400, 'Nincs szakdolgozat ilyen azonosítóval!');
        }

        return deletedThesis.populate('student', { password: 0 }).populate('lecturer', { password: 0 }).execPopulate();
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}