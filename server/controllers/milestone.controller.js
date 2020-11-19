const commonValidator = require('../models/validators/common.validators');

const milestoneService = require('../services/milestone.services');
const { createMilestoneFromRequest } = require('../helpers/req2model.helper');
const { ApiError, handleApiError } = require('../services/errors/ApiError');

exports.fetchAll = async (req, res) => {
    try {
        const milestones = await milestoneService.fetchAll(req.user);

        return res.json(milestones);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.fetchById = async (req, res) => {
    try{
        
        const milestoneId = req.params.milestoneId;

        if(!commonValidator.isValidObjectId(milestoneId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const milestone = await milestoneService.fetchById(milestoneId);

        return res.json(milestone);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.create = async (req, res) => {
    try {
        const { thesis } = req.body;

        if(!commonValidator.isValidObjectId(thesis)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }
        const milestone = createMilestoneFromRequest(req);
        const newMilestone = await milestoneService.create(milestone);

        return res.json(newMilestone);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.update = async (req, res) => {
    try {
        const { milestoneId } = req.params;

        if(!commonValidator.isValidObjectId(milestoneId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const milestone = req.body;

        const updatedMilestone = await milestoneService.update(req.user, milestoneId, milestone);

        return res.json(updatedMilestone);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.delete = async (req, res) => {
    try {
        const { milestoneId } = req.params;

        if(!commonValidator.isValidObjectId(milestoneId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const deletedMilestone = await milestoneService.delete(req.user, milestoneId);
        console.log(deletedMilestone);
        return res.json(deletedMilestone);
    } catch (error) {
        return handleApiError(error, res);
    }
}