import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  neptun?: string;
  @ApiProperty()
  lastName?: string;
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  role?: string;
}