const studentService = require('../services/student.services');
const commonValidator = require('../models/validators/common.validators');
const { createStudentFromRequest } = require('../helpers/req2model.helper');
const { handleApiError } = require('../services/errors/ApiError');

exports.fetchAll = async (req, res) => {
    try {
        const students = await studentService.fetchAll();

        return res.json(students);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.fetchById = async (req, res) => {
    try{
        const {studentId} = req.params;

        if(!commonValidator.isValidObjectId(studentId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const student = await studentService.fetchById(studentId);

        return res.json(student);
    } catch(error) {
        return handleApiError(error, res);
    }
}

exports.create = async (req, res) => {
    try {
        const student = createStudentFromRequest(req);
        const newStudent = await studentService.create(student);

        return res.json(newStudent);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.update = async (req, res) => {
    try {
        const { studentId } = req.params;

        if(!commonValidator.isValidObjectId(studentId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const student = req.body;

        const updatedStudent = await studentService.update(studentId, student);

        return res.json(updatedStudent);
    } catch (error) {
        console.log(error);
        return handleApiError(error, res);
    }
}

exports.delete = async (req, res) => {
    try {
        const { studentId } = req.params;

        if(!commonValidator.isValidObjectId(studentId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const deletedStudent = await studentService.delete(studentId);

        return res.json(deletedStudent);
    } catch (error) {
        return handleApiError(error, res);
    }
}