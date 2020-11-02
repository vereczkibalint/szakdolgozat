const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Milestone = require('../models/Milestone');

exports.fetchAll = async () => {
    try {
        const milestones = await Milestone.find();
        return milestones;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.fetchById = async (milestoneId) => {
    try {
        const milestone = await Milestone.findById(milestoneId);

        if(!milestone) {
            throw Error('Nincs mérföldkő ilyen azonosítóval!');
        }

        return milestone;
    } catch (error) {
        throw Error(error.message);
    }
}

exports.create = async (milestone) => {
    try {
        const newMilestone = await milestone.save();
        
        return newMilestone.populate('thesis').execPopulate();
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationError = validationErrorHelper.ProcessValidationError(error);
            throw validationError;
        } else {
            throw new Error(error.message);
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
            throw Error('Nincs mérföldkő ilyen azonosítóval!');
        }
        
        return updatedMilestone.populate('thesis').execPopulate();
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationError = validationErrorHelper.ProcessValidationError(error);
            throw validationError;
        } else {
            throw new Error(error.message);
        }
    }
}

exports.delete = async (milestoneId) => {
    try {
        const deletedMilestone = await Milestone.findOneAndRemove({ _id: milestoneId });
        if(!deletedMilestone) {
            throw Error('Nincs mérföldkő ilyen azonosítóval!');
        }

        return deletedMilestone.populate('thesis').execPopulate();
    } catch (error) {
        throw Error(error.message);
    }
}