const commonValidator = require('../models/validators/common.validators');

const thesisService = require('../services/thesis.services');
const thesisHelper = require('../helpers/thesis.helper');

exports.fetchAll = async (req, res) => {
    try {
        const theses = await thesisService.fetchAll();

        return res.json(theses);
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

exports.fetchById = async (req, res) => {
    const thesisId = req.params.thesisId;

    if(!commonValidator.isValidObjectId(thesisId)) {
        return res.status(400).json('Hibás azonosító!');
    }
    
    try{
        const thesis = await thesisService.fetchById(thesisId);

        return res.json(thesis);
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

exports.create = async (req, res) => {
    try {
        const thesis = thesisHelper.createThesisFromRequest(req);
        const newThesis = await thesisService.create(thesis);

        return res.json(newThesis);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.update = async (req, res) => {
    try {
        const { thesisId } = req.params;

        const thesis = req.body;

        const updatedThesis = await thesisService.update(thesisId, thesis);

        return res.json(updatedThesis);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        const { thesisId } = req.params;
        const deletedThesis = await thesisService.delete(thesisId);

        return res.json(deletedThesis);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}