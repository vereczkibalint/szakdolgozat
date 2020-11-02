const Student = require('../models/Student');

exports.createStudentFromRequest = (request) => {
    const student = new Student(request.body);

    return student;
}