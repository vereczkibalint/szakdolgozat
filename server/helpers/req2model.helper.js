const Lecturer = require('../models/Lecturer');
const Milestone = require('../models/Milestone');
const Student = require('../models/Student');
const Thesis = require('../models/Thesis');
const Consultation = require('../models/Consultation');

exports.createThesisFromRequest = (request) => {
    const thesis = new Thesis(request.body);

    return thesis;
}
exports.createStudentFromRequest = (request) => {
    const student = new Student(request.body);

    return student;
}

exports.createLecturerFromRequest = (request) => {
    const lecturer = new Lecturer(request.body);

    return lecturer;
}

exports.createMilestoneFromRequest = (request) => {
    const milestone = new Milestone(request.body);

    return milestone;
}

exports.createConsultationFromRequest = (request) => {
    const consultation = new Consultation(request.body);

    return consultation;
}