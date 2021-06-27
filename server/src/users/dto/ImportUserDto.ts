import { ApiProperty } from '@nestjs/swagger';

export class ImportUserDto {
  @ApiProperty()
  neptun!: string;
  @ApiProperty()
  lastName!: string;
  @ApiProperty()
  firstName!: string;
  @ApiProperty()
  email!: string;
  @ApiProperty()
  role!: string;
  @ApiProperty()
  password!: string;
}