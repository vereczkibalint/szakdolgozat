import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateMilestoneCommentDto {
  @ApiProperty()
  body!: string;
}