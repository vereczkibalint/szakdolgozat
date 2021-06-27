import { Module } from '@nestjs/common';
import { ThesesController } from './theses.controller';
import { ThesesService } from './theses.service';
import Thesis from './schemas/thesis.schema';
import { TypegooseModule } from 'nestjs-typegoose';
import ThesisTopic from "./schemas/thesis_topic.schema";
import Milestone from "../milestones/schemas/milestone.schema";

@Module({
  imports: [TypegooseModule.forFeature([Thesis, Milestone]), TypegooseModule.forFeature([ThesisTopic])],
  controllers: [ThesesController],
  providers: [ThesesService],
  exports: [ThesesService]
})
export class ThesesModule {}
