const User = require('../models/User');
const Milestone = require('../models/Milestone');
const Thesis = require('../models/Thesis');
const Consultation = require('../models/Consultation');
const ConsultationReservation = require('../models/ConsultationReservation');

exports.createThesisFromRequest = (request) => {
    const thesis = new Thesis(request.body);

    return thesis;
}
exports.createUserFromRequest = (request) => {
    const user = new User(request.body);

    return user;
}

exports.createMilestoneFromRequest = (request) => {
    const milestone = new Milestone(request.body);

    return milestone;
}

exports.createConsultationFromRequest = (request) => {
    const consultation = new Consultation(request.body);

    return consultation;
}

exports.createConsultationReservationFromRequest = (request) => {
    const reservation = new ConsultationReservation(request.body);

    return reservation;
}