import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import Consultation from './schemas/consultation.schema';
import { ApiTags } from '@nestjs/swagger';
import { CasterrorExceptionFilter } from '../exceptions/casterror-exception.filter';
import { ValidatorErrorFilter } from '../exceptions/validation-exception.filter';
import { CreateConsultationDto } from './dto/CreateConsultationDto';
import { UpdateConsultationDto } from './dto/UpdateConsultationDto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/guards/RoleGuard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Types } from 'mongoose';
import { ReqUser } from '../auth/decorators/requser.decorator';
import { ApiErrorExceptionFilter } from "../exceptions/apierror-exception.filter";

@Controller('consultations')
@ApiTags('consultations')
@UseFilters(new CasterrorExceptionFilter())
@UseFilters(new ValidatorErrorFilter())
@UseFilters(new ApiErrorExceptionFilter())

export class ConsultationsController {
  constructor(private readonly consultationService: ConsultationsService) {}

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER', 'STUDENT')
  @Get()
  async fetchAll(@ReqUser('_id') userId: string, @ReqUser('role') userRole: string): Promise<Consultation[]> {
    return await this.consultationService.fetchAll(Types.ObjectId(userId), userRole);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Get('/:consultationId')
  async fetchById(@Param('consultationId') consultationId: string, @ReqUser('_id') lecturerId: string): Promise<Consultation> {
    return await this.consultationService.fetchById(Types.ObjectId(consultationId), lecturerId);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Post()
  async create(@Body() createConsultationDto: CreateConsultationDto): Promise<Consultation> {
    return await this.consultationService.create(createConsultationDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Put('/:consultationId')
  async update(@ReqUser('_id') userId: string, @Param('consultationId') consultationId: string, @Body() updateConsultationDto: UpdateConsultationDto): Promise<Consultation> {
    return await this.consultationService.update(Types.ObjectId(userId), consultationId, updateConsultationDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Delete('/:consultationId')
  async delete(@ReqUser('_id') lecturerId: string, @Param('consultationId') consultationId: string): Promise<Consultation> {
    return await this.consultationService.delete(Types.ObjectId(lecturerId), Types.ObjectId(consultationId));
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('STUDENT')
  @Post('/reserve/:consultationId')
  async reserve(@ReqUser('_id') studentId: string, @Param('consultationId') consultationId: string): Promise<Consultation> {
    return await this.consultationService.reserve(Types.ObjectId(studentId), Types.ObjectId(consultationId));
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('STUDENT')
  @Post('/cancel/:reservationId')
  async cancel(@ReqUser('_id') studentId: string, @Param('reservationId') reservationId: string): Promise<Consultation> {
    return await this.consultationService.cancel(Types.ObjectId(studentId), Types.ObjectId(reservationId));
  }
}
