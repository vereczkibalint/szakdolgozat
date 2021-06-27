import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UploadedFile,
  UseFilters,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { ValidatorErrorFilter } from '../exceptions/validation-exception.filter';
import { CasterrorExceptionFilter } from '../exceptions/casterror-exception.filter';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/guards/RoleGuard';
import { Roles } from '../auth/decorators/roles.decorator';
import User from './schemas/user.schema';
import { ReqUser } from '../auth/decorators/requser.decorator';
import { Types } from 'mongoose';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ApiErrorExceptionFilter } from "../exceptions/apierror-exception.filter";

@Controller('users')
@ApiTags('users')
@UseFilters(new CasterrorExceptionFilter())
@UseFilters(new ValidatorErrorFilter())
@UseFilters(new ApiErrorExceptionFilter())
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER', 'ADMIN')
  @Get('/role/:role')
  async findByRole(@Param('role') role: string): Promise<User[]> {
    return await this.userService.findByRole(role.toUpperCase());
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId')
  async findById(@Param('userId') userId: string): Promise<User> {
    return await this.userService.findById(userId);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Put('/:userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.updateUser(Types.ObjectId(userId), updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/change_password')
  async changePassword(@ReqUser('_id') userId: string, @Body() changePasswordDto: ChangePasswordDto): Promise<User> {
    return await this.userService.changePassword(Types.ObjectId(userId), changePasswordDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Delete('/student/:studentId')
  async deleteStudent(@Param('studentId') studentId: string): Promise<User> {
    return await this.userService.deleteStudent(Types.ObjectId(studentId));
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  @Delete('/:userId')
  async delete(@Param('userId') userId: string): Promise<User> {
    return await this.userService.deleteUser(Types.ObjectId(userId));
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER', 'ADMIN')
  @UseInterceptors(FileInterceptor('import', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      },
    }),
    fileFilter: function(req, file, cb) {
      let fileExt = path.extname(file.originalname)
      if(fileExt !== '.csv') {
        return cb(new BadRequestException("Hibás fájlformátum! Elfogadott formátum: csv"), null);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 1024 * 1024
    }
  }))
  @Post('/:userType/import')
  importStudents(@UploadedFile() file, @Param('userType') userType: string) {
    return this.userService.importUsers(file.path, userType.toUpperCase());
  }
}
