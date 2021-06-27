import { Module } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';
import Consultation from './schemas/consultation.schema';
import { TypegooseModule } from 'nestjs-typegoose';
import Thesis from '../theses/schemas/thesis.schema';
import ConsultationReservation from './schemas/consultation-reservations.schema';

@Module({
  imports: [TypegooseModule.forFeature([Consultation]),TypegooseModule.forFeature([ConsultationReservation]), TypegooseModule.forFeature([Thesis])],
  providers: [ConsultationsService],
  controllers: [ConsultationsController]
})
export class ConsultationsModule {}
