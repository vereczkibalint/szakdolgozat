const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Milestone = require('../models/Milestone');
const {ApiError} = require('./errors/ApiError');

exports.fetchAll = async (user) => {
    try {
        let milestones = await Milestone.find();

        switch(user.role) {
            case 'LECTURER':
                milestones = milestones.filter(milestone => milestone.thesis.lecturer._id == user._id);
            break;
            case 'STUDENT':
                milestones = milestones.filter(milestone => milestone.thesis.student._id == user._id);
        }

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

exports.update = async (user, milestoneId, milestone) => {
    try {
        const result = await Milestone.findById(milestoneId).populate('thesis');
        if(!result) {
            throw new ApiError(400, 'Nincs mérföldkő ilyen azonosítóval!');
        }

        if(result.thesis.lecturer._id != user._id) {
            throw new ApiError(400, 'Hozzáférés megtagadva!');
        }

        Object.keys(milestone).forEach(key => {
            result[key] = milestone[key];
        });

        await result.save();

        return result;
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a mérföldkő frissítése közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba a mérföldkő frissítése közben!');
        }
    }
}

exports.delete = async (user, milestoneId) => {
    try {
        const result = await Milestone.findById(milestoneId).populate('thesis');

        if(!result) {
            throw new ApiError(400, 'Nincs mérföldkő ilyen azonosítóval!');
        }

        if(result.thesis.lecturer._id != user._id) {
            throw new ApiError(400, 'Hozzáférés megtagadva!');
        }

        const deletedMilestone = await Milestone.findOneAndDelete({ _id: milestoneId }).populate('thesis');

        return deletedMilestone;
    } catch (error) {
        throw new ApiError(400, 'Hiba a mérföldkő törlése közben!');
    }
}