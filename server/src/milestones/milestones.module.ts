import { Module } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { MilestonesController } from './milestones.controller';
import Milestone from './schemas/milestone.schema';
import { TypegooseModule } from 'nestjs-typegoose';
import { ThesesModule } from '../theses/theses.module';
import Thesis from '../theses/schemas/thesis.schema';
import MilestoneComment from './schemas/milestone_comment.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypegooseModule.forFeature([Milestone]), ThesesModule,
    TypegooseModule.forFeature([Thesis]), TypegooseModule.forFeature([MilestoneComment]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads'
      })
    })
  ],
  providers: [MilestonesService],
  controllers: [MilestonesController]
})
export class MilestonesModule {}
