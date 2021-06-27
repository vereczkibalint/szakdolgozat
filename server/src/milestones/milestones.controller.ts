import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseFilters,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { MilestonesService } from './milestones.service';
import Milestone from './schemas/milestone.schema';
import { ApiTags } from '@nestjs/swagger';
import { CasterrorExceptionFilter } from '../exceptions/casterror-exception.filter';
import { ValidatorErrorFilter } from '../exceptions/validation-exception.filter';
import { CreateMilestoneDto } from './dto/CreateMilestoneDto';
import { UpdateMilestoneDto } from './dto/UpdateMilestoneDto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/guards/RoleGuard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ReqUser } from '../auth/decorators/requser.decorator';
import { ThesesService } from '../theses/theses.service';
import { Types } from 'mongoose';
import { UpdateMilestoneStatusDto } from './dto/UpdateMilestoneStatusDto';
import { CreateMilestoneCommentDto } from './dto/CreateMilestoneCommentDto';
import { UpdateMilestoneCommentDto } from './dto/UpdateMilestoneCommentDto';
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiErrorExceptionFilter } from "../exceptions/apierror-exception.filter";
import { diskStorage } from 'multer';
import * as path from "path";

@Controller('milestones')
@ApiTags('milestones')
@UseFilters(new CasterrorExceptionFilter())
@UseFilters(new ValidatorErrorFilter())
@UseFilters(new ApiErrorExceptionFilter())
export class MilestonesController {
  constructor(private readonly thesisService: ThesesService, private readonly milestoneService: MilestonesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/thesis/:thesisId')
  async fetchAllByThesis(@Param('thesisId') thesisId: string, @ReqUser('_id') userId: string, @ReqUser('role') userRole: string): Promise<Milestone[]> {
    return await this.milestoneService.fetchAllByThesis(Types.ObjectId(thesisId), Types.ObjectId(userId), userRole);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:milestoneId')
  async fetchById(@Param('milestoneId') milestoneId: string, @ReqUser('_id') userId: string, @ReqUser('role') userRole: string) {
    return await this.milestoneService.findById(Types.ObjectId(milestoneId), Types.ObjectId(userId), userRole);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Post()
  async create(@Body() createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    return await this.milestoneService.create(createMilestoneDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Put('/:milestoneId')
  async update(@Param('milestoneId') milestoneId: string, @ReqUser('_id') userId: string, @ReqUser('role') userRole: string, @Body() updateMilestoneDto: UpdateMilestoneDto): Promise<Milestone> {
    return await this.milestoneService.update(Types.ObjectId(milestoneId), Types.ObjectId(userId), updateMilestoneDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Post('/status/:milestoneId')
  async updateStatus(@Param('milestoneId') milestoneId: string, @ReqUser('_id') userId: string, @Body() updateMilestoneStatusDto: UpdateMilestoneStatusDto): Promise<Milestone> {
    return await this.milestoneService.updateStatus(Types.ObjectId(milestoneId), Types.ObjectId(userId), updateMilestoneStatusDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('STUDENT', 'LECTURER')
  @Post('/comments/:milestoneId')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './uploads/milestones',
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      },
    }),
    fileFilter: function(req, file, cb) {
      let fileExt = path.extname(file.originalname)
      if(!['.pdf','.jpg','.png', '.docx', '.xlsx'].includes(fileExt)) {
        return cb(new BadRequestException("Hibás fájlformátum! Elfogadott formátum: pdf, jpg, png"), null);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 5120 * 5120
    }
  }))
  async insertComment(@Param('milestoneId') milestoneId: string, @UploadedFiles() files: any, @Body() createMilestoneCommentDto: CreateMilestoneCommentDto): Promise<Milestone> {
    return await this.milestoneService.createComment(Types.ObjectId(milestoneId), files, createMilestoneCommentDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('STUDENT', 'LECTURER')
  @Put('/comments/:milestoneId/:commentId')
  async updateComment(@Param('milestoneId') milestoneId: string, @Param('commentId') commentId: string, @ReqUser('_id') userId: string, @Body() updateMilestoneCommentDto: UpdateMilestoneCommentDto): Promise<Milestone> {
    return await this.milestoneService.updateComment(Types.ObjectId(milestoneId), Types.ObjectId(commentId), Types.ObjectId(userId), updateMilestoneCommentDto);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('STUDENT', 'LECTURER')
  @Delete('/comments/:milestoneId/:commentId')
  async deleteComment(@Param('milestoneId') milestoneId: string, @Param('commentId') commentId: string, @ReqUser('_id') userId: string): Promise<Milestone> {
    return await this.milestoneService.deleteComment(Types.ObjectId(milestoneId), Types.ObjectId(commentId), Types.ObjectId(userId));
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('LECTURER')
  @Delete('/:milestoneId')
  async delete(@Param('milestoneId') milestoneId: string, @ReqUser('_id') lecturerId: string): Promise<Milestone> {
    return await this.milestoneService.delete(Types.ObjectId(milestoneId), Types.ObjectId(lecturerId));
  }
}
