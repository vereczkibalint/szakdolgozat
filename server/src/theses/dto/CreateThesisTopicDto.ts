import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateThesisTopicDto {
  @ApiProperty()
  lecturer!: Types.ObjectId;
  @ApiProperty()
  title!: string;
}
