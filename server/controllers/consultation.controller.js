const commonValidator = require('../models/validators/common.validators');
const consultationService = require('../services/consultation.services');
const { createConsultationFromRequest } = require('../helpers/req2model.helper');

const { handleApiError } = require('../services/errors/ApiError');

exports.fetchAll = async (req, res) => {
    try {
        const consultations = await consultationService.fetchAll();

        return res.json(consultations);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.fetchById = async (req, res) => {
    try{
        const {consultationId} = req.params;

        if(!commonValidator.isValidObjectId(consultationId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const consultation = await consultationService.fetchById(consultationId);

        return res.json(consultation);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.create = async (req, res) => {
    try {
        const consultation = createConsultationFromRequest(req);
        const newConsultation = await consultationService.create(consultation);

        return res.json(newConsultation);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.update = async (req, res) => {
    try {
        const { consultationId } = req.params;

        if(!commonValidator.isValidObjectId(consultationId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const consultation = req.body;

        const updatedConsultation = await consultationService.update(consultationId, consultation);

        return res.json(updatedConsultation);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.delete = async (req, res) => {
    try {
        const { consultationId } = req.params;

        if(!commonValidator.isValidObjectId(consultationId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const deletedConsultation = await consultationService.delete(consultationId);

        return res.json(deletedConsultation);
    } catch (error) {
        return handleApiError(error, res);
    }
}