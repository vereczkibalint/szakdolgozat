import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Consultation from './schemas/consultation.schema';
import { CreateConsultationDto } from './dto/CreateConsultationDto';
import { UpdateConsultationDto } from './dto/UpdateConsultationDto';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import Thesis from '../theses/schemas/thesis.schema';
import ConsultationReservation from './schemas/consultation-reservations.schema';
import User from '../users/schemas/user.schema';
import ApiError from "../exceptions/ApiError";

@Injectable()
export class ConsultationsService {
  constructor(@InjectModel(ConsultationReservation) private reservationModel: ReturnModelType<typeof ConsultationReservation>, @InjectModel(Thesis) private thesisModel: ReturnModelType<typeof Thesis>, @InjectModel(Consultation) private consultationModel: ReturnModelType<typeof Consultation>) {}

  async fetchAll(userId: Types.ObjectId, userRole: string): Promise<Consultation[]> {
    if(userRole === 'LECTURER') {
      return this.consultationModel.find({ lecturer: userId }).exec();
    } else {
      let thesis = await this.thesisModel.findOne({ student: userId });

      if(!thesis) {
        throw new ApiError("Konzultációk lekérése nem lehetséges!");
      }

      return await this.consultationModel.find({ lecturer: thesis.lecturer }).exec();
    }
  }

  async fetchById(consultationId: Types.ObjectId, lecturerId: string): Promise<Consultation> {
    return await this.consultationModel.findOne({ _id: consultationId, lecturer: lecturerId }).exec();
  }

  async create(createConsultationDto: CreateConsultationDto): Promise<Consultation> {
    const newConsultation = new this.consultationModel(createConsultationDto);
    await newConsultation.save();

    return this.consultationModel.findById(newConsultation._id);
  }

  async update(userId: Types.ObjectId, consultationId: string, updateConsultationDto: UpdateConsultationDto): Promise<Consultation> {
    const consultation = await this.consultationModel.findOne({ _id: Types.ObjectId(consultationId), lecturer: userId });

    if(!consultation) {
      throw new ApiError("A konzultáció nem található!");
    }

    consultation.startTime = updateConsultationDto.startTime;
    consultation.endTime = updateConsultationDto.endTime;
    consultation.location = updateConsultationDto.location;
    consultation.description = updateConsultationDto.description;

    await consultation.save();

    return consultation;
  }

  async delete(lecturerId: Types.ObjectId, consultationId: Types.ObjectId): Promise<Consultation> {
    const consultation = await this.consultationModel.findOne({ _id: consultationId, lecturer: lecturerId });

    if(!consultation) {
      throw new ApiError("A konzultáció nem található!");
    }

    let reservation = await this.reservationModel.findOne({ _id: consultation.reservation }).exec();

    if(reservation) {
      await reservation.remove();
    }

    return this.consultationModel.findOneAndRemove({ _id: consultationId, lecturer: lecturerId }).exec();
  }

  async reserve(studentId: Types.ObjectId, consultationId: Types.ObjectId): Promise<Consultation> {
    let consultation = await this.consultationModel.findOne({ _id: consultationId }).exec();

    if(consultation.reservation) {
      throw new ApiError("A konzultáció már foglalt!");
    }

    let reservation = new this.reservationModel({ consultation: consultationId, student: studentId });
    await reservation.save();

    consultation.reservation = reservation._id;
    await consultation.save();

    return await this.consultationModel.findById(consultationId).exec();
  }

  async cancel(studentId: Types.ObjectId, reservationId: Types.ObjectId): Promise<Consultation> {
    let reservation = await this.reservationModel.findOne({ _id: reservationId }).exec();

    if(!(reservation.student as User)._id.equals(studentId)) {
      throw new ApiError("Hozzáférés megtagadva!");
    }

    let consultation = await this.consultationModel.findOne({ reservation: reservationId }).exec();
    consultation.reservation = null;
    reservation.remove();
    await consultation.save();

    return await this.consultationModel.findById(consultation._id).exec();
  }
}
