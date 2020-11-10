const commonValidator = require('../models/validators/common.validators');

const thesisService = require('../services/thesis.services');
const { createThesisFromRequest } = require('../helpers/req2model.helper');
const { ApiError, handleApiError } = require('../services/errors/ApiError');

exports.fetchAll = async (req, res) => {
    try {
        const theses = await thesisService.fetchAll();

        return res.json(theses);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.fetchById = async (req, res) => {
    try{
        const {thesisId} = req.params;

        if(!commonValidator.isValidObjectId(thesisId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const thesis = await thesisService.fetchById(thesisId);

        return res.json(thesis);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.create = async (req, res) => {
    try {
        const thesis = createThesisFromRequest(req);
        const newThesis = await thesisService.create(thesis);

        return res.json(newThesis);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.update = async (req, res) => {
    try {
        const { thesisId } = req.params;

        if(!commonValidator.isValidObjectId(thesisId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const thesis = req.body;

        const updatedThesis = await thesisService.update(thesisId, thesis);

        return res.json(updatedThesis);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.delete = async (req, res) => {
    try {
        const { thesisId } = req.params;

        if(!commonValidator.isValidObjectId(thesisId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const deletedThesis = await thesisService.delete(thesisId);

        return res.json(deletedThesis);
    } catch (error) {
        return handleApiError(error, res);
    }
}