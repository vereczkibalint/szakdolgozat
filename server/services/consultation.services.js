const mongoose = require('mongoose');
const validationErrorHelper = require('../helpers/validation_errors.helper');
const Consultation = require('../models/Consultation');
const ConsultationReservation = require('../models/ConsultationReservation');

const {ApiError} = require('./errors/ApiError');

exports.fetchAll = async () => {
    try {
        const consultations = await Consultation.find();
        return consultations;
    } catch (error) {
        throw new ApiError(400, 'Hiba a konzultációk lekérése során!');
    }
}

exports.fetchById = async (consultationId) => {
    try {
        const consultation = await Consultation.findById(consultationId);

        if(!consultation) {
            throw new ApiError(400, 'Nincs konzultáció ilyen azonosítóval!');
        }

        return consultation;
    } catch (error) {
        throw new ApiError(400, 'Hiba a konzultáció lekérése során!');
    }
}

exports.create = async (consultation) => {
    try {
        const newConsultation = await consultation.save();
        
        return await newConsultation.populate('lecturer', { password: 0 }).execPopulate();
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a konzultáció létrehozása közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba a konzultáció létrehozása közben!');
        }
    }
}

exports.update = async (consultationId, consultation) => {
    try {
        let consultationResult = await Consultation.findById(consultationId);

        if(!consultationResult) {
            throw new ApiError(400, 'Nincs konzultáció ilyen azonosítóval!');
        }

        consultationResult.lecturer = consultation.lecturer;
        consultationResult.startTime = consultation.startTime;
        consultationResult.endTime = consultation.endTime;

        await consultationResult.save();

        return consultationResult.populate('lecturer', { password: 0 }).execPopulate();
        
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a konzultáció frissítése közben!', validationErrors);
        } else {
            throw new ApiError(400, error.message);
        }
    }
}

exports.delete = async (consultationId) => {
    try {
        const deletedConsultation = await Consultation.findOneAndRemove({ _id: consultationId });
        if(!deletedConsultation) {
            throw new ApiError(400, 'Nincs konzultáció ilyen azonosítóval!');
        }

        return deletedConsultation.populate('lecturer', { password: 0 }).execPopulate();
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}

exports.reserve = async (reservation) => {
    try {
        const consultation = await Consultation.findById(reservation.consultation);
        if(!consultation) {
            throw new ApiError(400, 'Nincs konzultáció ilyen azonosítóval!');
        }

        const reservedConsultation = await reservation.save();

        return reservedConsultation.populate('consultation').populate('student', { password: 0 }).execPopulate();
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a foglalás létrehozása közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba a foglalás létrehozása közben!');
        }
    }
}

exports.cancel = async (reservationId) => {
    try {
        const deletedReservation = await ConsultationReservation.findOneAndRemove({ _id: reservationId });
        if(!deletedReservation) {
            throw new ApiError(400, 'Nincs foglalás ilyen azonosítóval!');
        }

        return deletedReservation.populate('consultation').populate('student', { password: 0 }).execPopulate();
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let validationErrors = validationErrorHelper.ProcessValidationError(error);
            throw new ApiError(400, 'Hiba a foglalás visszavonása közben!', validationErrors);
        } else {
            throw new ApiError(400, 'Hiba a foglalás visszavonása közben!');
        }
    }
}

exports.fetchAllReservation = async () => {
    try {
        const reservations = await ConsultationReservation.find();
        return reservations;
    } catch (error) {
        throw new ApiError(400, 'Hiba a foglalások lekérése során!');
    }
}

exports.fetchReservationById = async (reservationId) => {
    try {
        const reservation = await ConsultationReservation.findById(reservationId);

        if(!reservation) {
            throw new ApiError(400, 'Nincs foglalás ilyen azonosítóval!');
        }

        return reservation;
    } catch (error) {
        throw new ApiError(400, 'Hiba a foglalás lekérése során!');
    }
}