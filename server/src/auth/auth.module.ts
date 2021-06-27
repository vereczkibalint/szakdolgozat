import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'szakdoga',
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
