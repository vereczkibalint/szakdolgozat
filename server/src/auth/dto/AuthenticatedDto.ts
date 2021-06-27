import { UserDto } from './UserDto';

export class AuthenticatedDto {
  token: string;
  user: UserDto;
}