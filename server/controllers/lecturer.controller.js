const lecturerService = require('../services/lecturer.services');
const lecturerHelper = require('../helpers/lecturer.helper');

const { handleApiError } = require('../services/errors/ApiError');

exports.fetchAll = async (req, res, next) => {
    try {
        const lecturers = await lecturerService.fetchAll();

        return res.json(lecturers);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.fetchById = async (req, res, next) => {
    try{
        const lecturer = await lecturerService.fetchById(req.params.lecturerId);

        return res.json(lecturer);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.create = async (req, res, next) => {
    try {
        const lecturer = lecturerHelper.createLecturerFromRequest(req);
        const newLecturer = await lecturerService.create(lecturer);

        return res.json(newLecturer);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.update = async (req, res, next) => {
    try {
        const { lecturerId } = req.params;

        const lecturer = req.body;

        const updatedLecturer = await lecturerService.update(lecturerId, lecturer);

        return res.json(updatedLecturer);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { lecturerId } = req.params;
        const deletedLecturer = await lecturerService.delete(lecturerId);

        return res.json(deletedLecturer);
    } catch (error) {
        return handleApiError(error, res);
    }
}