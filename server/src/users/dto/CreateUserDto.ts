import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  neptun: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
}