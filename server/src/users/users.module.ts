import { Module } from '@nestjs/common';
import User from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
import Thesis from "../theses/schemas/thesis.schema";
import MilestoneComment from "../milestones/schemas/milestone_comment.schema";
import ConsultationReservation from "../consultations/schemas/consultation-reservations.schema";
import ThesisTopic from "../theses/schemas/thesis_topic.schema";

@Module({
  imports: [TypegooseModule.forFeature([User,Thesis,MilestoneComment,ConsultationReservation, ThesisTopic])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
