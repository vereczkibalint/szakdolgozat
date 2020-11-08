const commonValidator = require('../models/validators/common.validators');

const milestoneService = require('../services/milestone.services');
const milestoneHelper = require('../helpers/milestone.helper');
const {ApiError, handleApiError} = require('../services/errors/ApiError');

exports.fetchAll = async (req, res) => {
    try {
        const milestones = await milestoneService.fetchAll();

        return res.json(milestones);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.fetchById = async (req, res) => {
    const milestoneId = req.params.milestoneId;

    if(!commonValidator.isValidObjectId(milestoneId)) {
        let err = new ApiError(400, 'Hibás azonosító!');
        return handleApiError(err, res);
    }
    
    try{
        const milestone = await milestoneService.fetchById(milestoneId);

        return res.json(milestone);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.create = async (req, res) => {
    try {
        const milestone = milestoneHelper.createMilestoneFromRequest(req);
        const newMilestone = await milestoneService.create(milestone);

        return res.json(newMilestone);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.update = async (req, res) => {
    try {
        const { milestoneId } = req.params;

        const milestone = req.body;

        const updatedMilestone = await milestoneService.update(milestoneId, milestone);

        return res.json(updatedMilestone);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.delete = async (req, res) => {
    try {
        const { milestoneId } = req.params;
        const deletedMilestone = await milestoneService.delete(milestoneId);

        return res.json(deletedMilestone);
    } catch (error) {
        return handleApiError(error, res);
    }
}