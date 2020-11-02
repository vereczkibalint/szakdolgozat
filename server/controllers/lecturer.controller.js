const lecturerService = require('../services/lecturer.services');
const lecturerHelper = require('../helpers/lecturer.helper');
const Lecturer = require('../models/Lecturer');

exports.fetchAll = async (req, res) => {
    try {
        const lecturers = await lecturerService.fetchAll();

        return res.json(lecturers);
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

exports.fetchById = async (req, res) => {
    try{
        const lecturer = await lecturerService.fetchById(req.params.lecturerId);

        return res.json(lecturer);
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

exports.create = async (req, res) => {
    try {
        const lecturer = lecturerHelper.createLecturerFromRequest(req);
        const newLecturer = await lecturerService.create(lecturer);

        return res.json(newLecturer);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.update = async (req, res) => {
    try {
        const { lecturerId } = req.params;

        const lecturer = req.body;

        const updatedLecturer = await lecturerService.update(lecturerId, lecturer);

        return res.json(updatedLecturer);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        const { lecturerId } = req.params;
        const deletedLecturer = await lecturerService.delete(lecturerId);

        return res.json(deletedLecturer);
    } catch (error) {
        return res.status(400).json(error);
    }
}