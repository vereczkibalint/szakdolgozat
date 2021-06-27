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
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ThesesService } from './theses.service';
import Thesis from './schemas/thesis.schema';
import { ApiTags } from '@nestjs/swagger';
import { CasterrorExceptionFilter } from '../exceptions/casterror-exception.filter';
import { ValidatorErrorFilter } from '../exceptions/validation-exception.filter';
import { CreateThesisDto } from './dto/CreateThesisDto';
import { UpdateThesisDto } from './dto/UpdateThesisDto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/guards/RoleGuard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ReqUser } from '../auth/decorators/requser.decorator';
import { Types } from 'mongoose';
import { CreateThesisTopicDto } from "./dto/CreateThesisTopicDto";
import ThesisTheme from "./schemas/thesis_topic.schema";
import { UpdateThesisTopicDto } from "./dto/UpdateThesisTopicDto";
import { ApiErrorExceptionFilter } from "../exceptions/apierror-exception.filter";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('theses')
@ApiTags('theses')
@UseFilters(new CasterrorExceptionFilter())
@UseFilters(new ValidatorErrorFilter())
@UseFilters(new ApiErrorExceptionFilter())
export class ThesesController {
  constructor(private readonly thesisService: ThesesService) {}

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('STUDENT', 'LECTURER')
  @Get()
  async fetchAll(@ReqUser('_id') userId: string, @ReqUser('role') userRole: string) : Promise<Thesis | Thesis[]> {
    if(userRole === 'LECTURER') {
      return await this.thesisService.fetchAll(Types.ObjectId(userId));
    } else {
      return await this.thesisService.fetchByStudent(Types.ObjectId(userId));
    }
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Get('/themes')
  async fetchAllThesisThemes(@ReqUser('_id') lecturerId: string): Promise<ThesisTheme[]> {
    return await this.thesisService.fetchAllThesisTopic(Types.ObjectId(lecturerId));
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Get('/:thesisId')
  async findById(@Param('thesisId') thesisId: string, @ReqUser('_id') lecturerId: string): Promise<Thesis> {
    return await this.thesisService.fetchById(Types.ObjectId(thesisId), Types.ObjectId(lecturerId));
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Post()
  async create(@Body() createThesisDto: CreateThesisDto): Promise<Thesis> {
    return await this.thesisService.createThesis(createThesisDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Post('/themes')
  async createThesisTopic(@Body() createThesisThemeDto: CreateThesisTopicDto): Promise<ThesisTheme> {
    return await this.thesisService.createThesisTopic(createThesisThemeDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Post('/themes/import')
  @UseInterceptors(FileInterceptor('import', {
    storage: diskStorage({
      destination: './uploads/themes',
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
  async importThesisTheme(@ReqUser('_id') lecturerId: string, @UploadedFile() importFile): Promise<ThesisTheme[]> {
    return await this.thesisService.importThesisTopic(Types.ObjectId(lecturerId), importFile.path);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Put('/themes/:themeId')
  async updateThesisTheme(@Param('themeId') themeId: string, @ReqUser('_id') lecturerId: string, @Body() updateThesisThemeDto: UpdateThesisTopicDto): Promise<ThesisTheme> {
    return await this.thesisService.updateThesisTopic(Types.ObjectId(themeId), Types.ObjectId(lecturerId), updateThesisThemeDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Delete('/themes/:themeId')
  async deleteThesisTheme(@Param('themeId') themeId: string, @ReqUser('_id') lecturerId: string): Promise<ThesisTheme> {
    return await this.thesisService.deleteThesisTopic(Types.ObjectId(lecturerId), Types.ObjectId(themeId));
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Put('/:thesisId')
  async update(@Param('thesisId') thesisId: string, @ReqUser('_id') lecturerId: string, @Body() updateThesisDto: UpdateThesisDto): Promise<Thesis> {
    return await this.thesisService.updateThesis(Types.ObjectId(thesisId), Types.ObjectId(lecturerId), updateThesisDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Delete('/:thesisId')
  async delete(@Param('thesisId') thesisId: string, @ReqUser('_id') lecturerId: string): Promise<Thesis> {
    return await this.thesisService.deleteThesis(Types.ObjectId(thesisId), Types.ObjectId(lecturerId));
  }
}
