const studentService = require('../services/student.services');
const studentHelper = require('../helpers/student.helper');

exports.fetchAll = async (req, res) => {
    try {
        const students = await studentService.fetchAll();

        return res.json(students);
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

exports.fetchById = async (req, res) => {
    try{
        const student = await studentService.fetchById(req.params.studentId);

        return res.json(student);
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

exports.create = async (req, res) => {
    try {
        const student = studentHelper.createStudentFromRequest(req);
        const newStudent = await studentService.create(student);

        return res.json(newStudent);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.update = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = req.body;

        const updatedStudent = await studentService.update(studentId, student);

        return res.json(updatedStudent);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        const { studentId } = req.params;
        const deletedStudent = await studentService.delete(studentId);

        return res.json(deletedStudent);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}