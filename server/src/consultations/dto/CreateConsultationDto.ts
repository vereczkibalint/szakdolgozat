import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateConsultationDto {
  @ApiProperty()
  lecturer!: Types.ObjectId;
  @ApiProperty()
  startTime!: Date;
  @ApiProperty()
  endTime!: Date;
  @ApiProperty()
  location!: string;
  @ApiProperty()
  description?: string;
}