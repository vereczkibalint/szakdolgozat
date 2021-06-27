import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateThesisDto {
  @ApiProperty()
  student?: Types.ObjectId;
  @ApiProperty()
  topic?: Types.ObjectId;
  @ApiProperty()
  title?: string;
}