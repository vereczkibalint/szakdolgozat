const commonValidator = require('../models/validators/common.validators');

const milestoneService = require('../services/milestone.services');
const milestoneHelper = require('../helpers/milestone.helper');

exports.fetchAll = async (req, res) => {
    try {
        const milestones = await milestoneService.fetchAll();

        return res.json(milestones);
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

exports.fetchById = async (req, res) => {
    const milestoneId = req.params.milestoneId;

    if(!commonValidator.isValidObjectId(milestoneId)) {
        return res.status(400).json('Hibás azonosító!');
    }
    
    try{
        const milestone = await milestoneService.fetchById(milestoneId);

        return res.json(milestone);
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

exports.create = async (req, res) => {
    try {
        const milestone = milestoneHelper.createMilestoneFromRequest(req);
        const newMilestone = await milestoneService.create(milestone);

        return res.json(newMilestone);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.update = async (req, res) => {
    try {
        const { milestoneId } = req.params;

        const milestone = req.body;

        const updatedMilestone = await milestoneService.update(milestoneId, milestone);

        return res.json(updatedMilestone);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        const { milestoneId } = req.params;
        const deletedMilestone = await milestoneService.delete(milestoneId);

        return res.json(deletedMilestone);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}