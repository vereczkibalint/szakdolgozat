import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/AuthLoginDto';
import { AuthenticatedDto } from './dto/AuthenticatedDto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: AuthLoginDto): Promise<AuthenticatedDto> {
    return await this.authService.login(loginDto);
  }

  @Post('/admin')
  async adminLogin(@Body() loginDto: AuthLoginDto): Promise<AuthenticatedDto> {
    return await this.authService.adminLogin(loginDto);
  }
}
