const Lecturer = require('../models/Lecturer');

exports.createLecturerFromRequest = (request) => {
    const lecturer = new Lecturer(request.body);

    return lecturer;
}