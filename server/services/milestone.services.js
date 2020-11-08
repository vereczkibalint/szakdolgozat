const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Milestone = require('../models/Milestone');
const {ApiError} = require('./errors/ApiError');

exports.fetchAll = async () => {
    try {
        const milestones = await Milestone.find();
        return milestones;
    } catch (error) {
        throw new ApiError(400, 'Hiba a mérföldkövek lekérdezése közben!');
    }
}

exports.fetchById = async (milestoneId) => {
    try {
        const milestone = await Milestone.findById(milestoneId);

        if(!milestone) {
            throw new ApiError(400, 'Nincs mérföldkő ilyen azonosítóval!');
        }

        return milestone;
    } catch (error) {
        throw new ApiError(400, 'Hiba a mérföldkő lekérése közben!');
    }
}

exports.create = async (milestone) => {
    try {
        const newMilestone = await milestone.save();
        
        return newMilestone.populate('thesis').execPopulate();
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a mérföldkő létrehozása közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba a mérföldkő létrehozása közben!');
        }
    }
}

exports.update = async (milestoneId, milestone) => {
    try {
        const updatedMilestone = await Milestone.findOneAndUpdate(
            { _id: milestoneId },
            milestone,
            { new: true, runValidators: true });

        const milestoneNotFound = !updatedMilestone;

        if(milestoneNotFound) {
            throw new ApiError(400, 'Nincs mérföldkő ilyen azonosítóval!');
        }
        
        return updatedMilestone.populate('thesis').execPopulate();
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a mérföldkő frissítése közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba a mérföldkő frissítése közben!');
        }
    }
}

exports.delete = async (milestoneId) => {
    try {
        const deletedMilestone = await Milestone.findOneAndRemove({ _id: milestoneId });
        if(!deletedMilestone) {
            throw new ApiError(400, 'Nincs mérföldkő ilyen azonosítóval!');
        }

        return deletedMilestone.populate('thesis').execPopulate();
    } catch (error) {
        throw new ApiError(400, 'Hiba a mérföldkő törlése közben!');
    }
}