import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  password?: string;
}