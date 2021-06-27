import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

export class CreateMilestoneCommentDto {
  @ApiProperty()
  author: Schema.Types.ObjectId;
  @ApiProperty()
  body: string;
}
