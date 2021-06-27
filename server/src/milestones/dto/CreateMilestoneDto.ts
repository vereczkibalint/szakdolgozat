import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

export class CreateMilestoneDto {
  @ApiProperty()
  thesis!: Schema.Types.ObjectId;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  description!: string;
  @ApiProperty()
  deadline!: Date;
  @ApiProperty()
  isDraft!: boolean;
  @ApiProperty()
  tags?: string[];
}