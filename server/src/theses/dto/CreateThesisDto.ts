import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateThesisDto {
  @ApiProperty()
  lecturer: Types.ObjectId;
  @ApiProperty()
  student: Types.ObjectId;
  @ApiProperty()
  topic: string;
  @ApiProperty()
  title: string;
}