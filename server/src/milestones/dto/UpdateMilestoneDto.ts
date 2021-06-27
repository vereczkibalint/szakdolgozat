import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateMilestoneDto {
  @ApiProperty()
  thesis?: Types.ObjectId;
  @ApiProperty()
  title?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  deadline?: Date;
  @ApiProperty()
  status?: string;
  @ApiProperty()
  isDraft?: boolean;
  @ApiProperty()
  tags?: string[];
}