const lecturerService = require('../services/lecturer.services');
const { createLecturerFromRequest } = require('../helpers/req2model.helper');

const commonValidator = require('../models/validators/common.validators');

const { handleApiError } = require('../services/errors/ApiError');

exports.fetchAll = async (req, res) => {
    try {
        const lecturers = await lecturerService.fetchAll();

        return res.json(lecturers);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.fetchById = async (req, res) => {
    try{
        const { lecturerId } = req.params;

        if(!commonValidator.isValidObjectId(lecturerId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const lecturer = await lecturerService.fetchById(lecturerId);

        return res.json(lecturer);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.create = async (req, res) => {
    try {
        const lecturer = createLecturerFromRequest(req);
        const newLecturer = await lecturerService.create(lecturer);

        return res.json(newLecturer);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.update = async (req, res) => {
    try {
        const { lecturerId } = req.params;

        if(!commonValidator.isValidObjectId(lecturerId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const lecturer = req.body;

        const updatedLecturer = await lecturerService.update(lecturerId, lecturer);

        return res.json(updatedLecturer);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.delete = async (req, res) => {
    try {
        const { lecturerId } = req.params;

        if(!commonValidator.isValidObjectId(lecturerId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }
        
        const deletedLecturer = await lecturerService.delete(lecturerId);

        return res.json(deletedLecturer);
    } catch (error) {
        return handleApiError(error, res);
    }
}