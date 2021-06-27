import { ApiProperty } from '@nestjs/swagger';

export class UpdateMilestoneStatusDto {
  @ApiProperty()
  status!: string;
}