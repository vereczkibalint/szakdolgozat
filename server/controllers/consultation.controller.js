const commonValidator = require('../models/validators/common.validators');
const consultationService = require('../services/consultation.services');
const { createConsultationFromRequest, createConsultationReservationFromRequest } = require('../helpers/req2model.helper');

const { ApiError, handleApiError } = require('../services/errors/ApiError');
const ConsultationReservation = require('../models/ConsultationReservation');

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
        const { consultationId } = req.params;

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
        const { lecturer } = req.body;

        if(!commonValidator.isValidObjectId(lecturer)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

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

exports.reserve = async (req, res) => {
    try {
        const { student, consultation } = req.body;

        if(!commonValidator.isValidObjectId(student) || !commonValidator.isValidObjectId(consultation)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const reservation = createConsultationReservationFromRequest(req);

        const reservedConsultation = await consultationService.reserve(reservation);

        return res.json(reservedConsultation);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.cancel = async (req, res) => {
    try {
        const { reservation } = req.body;

        if(!commonValidator.isValidObjectId(reservation)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const deletedReservation = await consultationService.cancel(reservation);

        return res.json(deletedReservation);
    } catch (error) {
        return handleApiError(error, res);
    }
}

exports.fetchReservations = async (req, res) => {
    try {
        console.log('here');
        const reservations = await consultationService.fetchAllReservation();

        return res.json(reservations);
    } catch (error) {
        console.log(error);
        return handleApiError(error, res);
    }
}

exports.fetchReservationsById = async (req, res) => {
    try{
        const { reservationId } = req.params;

        if(!commonValidator.isValidObjectId(reservationId)) {
            let err = new ApiError(400, 'Hibás azonosító!');
            return handleApiError(err, res);
        }

        const reservation = await consultationService.fetchReservationById(reservationId);

        return res.json(reservation);
    } catch(error) {
        console.log(error);
        return handleApiError(error, res);
    }
}