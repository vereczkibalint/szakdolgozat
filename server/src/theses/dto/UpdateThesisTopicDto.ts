import { ApiProperty } from '@nestjs/swagger';

export class UpdateThesisTopicDto {
  @ApiProperty()
  title!: string;
}
