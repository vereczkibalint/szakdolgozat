import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Milestone from './schemas/milestone.schema';
import { CreateMilestoneDto } from './dto/CreateMilestoneDto';
import { UpdateMilestoneDto } from './dto/UpdateMilestoneDto';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from "mongoose";
import Thesis from '../theses/schemas/thesis.schema';
import User from '../users/schemas/user.schema';
import { UpdateMilestoneStatusDto } from './dto/UpdateMilestoneStatusDto';
import { CreateMilestoneCommentDto } from './dto/CreateMilestoneCommentDto';
import MilestoneComment from './schemas/milestone_comment.schema';
import { UpdateMilestoneCommentDto } from './dto/UpdateMilestoneCommentDto';
import ApiError from "../exceptions/ApiError";
import * as fs from "fs";

@Injectable()
export class MilestonesService {
  constructor(@InjectModel(Thesis) private thesisModel: ReturnModelType<typeof Thesis>,
              @InjectModel(Milestone) private milestoneModel: ReturnModelType<typeof Milestone>,
              @InjectModel(MilestoneComment) private milestoneCommentModel: ReturnModelType<typeof MilestoneComment>,
  ) {}

  async fetchAllByThesis(thesisId: Types.ObjectId, userId: Types.ObjectId, userRole: string): Promise<Milestone[]> {
    if(!thesisId) {
      return [];
    }
    let thesis = await this.thesisModel.findById(thesisId);

    let thesisUserId = userRole === 'LECTURER' ? (thesis.lecturer as User)._id : (thesis.student as User)._id;
    if(!thesisUserId.equals(userId)) {
      throw new ApiError("Hozzáférés megtagadva!");
    }

    return await this.milestoneModel.find({ thesis: thesisId }).exec();
  }

  async findById(milestoneId: Types.ObjectId, userId: Types.ObjectId, userRole: string): Promise<Milestone> {
    let milestone = await this.milestoneModel.findById(milestoneId);
    let thesis = await this.thesisModel.findById(milestone.thesis);
    let thesisUserId = userRole === 'LECTURER' ? (thesis.lecturer as User)._id : (thesis.student as User)._id;
    if(!thesisUserId.equals(userId)) {
      throw new ApiError("Hozzáférés megtagadva!");
    }

    return milestone;
  }

  async create(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    let today = new Date();
    if(createMilestoneDto.deadline < today) {
      throw new ApiError("A határidőnek a mai dátumnál későbbinek kell lennie!");
    }

    const newMilestone = new this.milestoneModel(createMilestoneDto);
    await newMilestone.save();

    return this.milestoneModel.findById(newMilestone._id);
  }

  async update(milestoneId: Types.ObjectId, userId: Types.ObjectId, updateMilestoneDto: UpdateMilestoneDto): Promise<Milestone> {
    let milestone = await this.milestoneModel.findById(milestoneId);
    let thesis = await this.thesisModel.findById(milestone.thesis as Types.ObjectId);
    let thesisLecturerId = (thesis.lecturer as User)._id;
    if(!thesisLecturerId.equals(userId)) {
      throw new ApiError("Hozzáférés megtagadva!");
    } else {
      if (updateMilestoneDto.deadline < milestone.deadline) {
        throw new ApiError("A határidőnek a mai dátumnál későbbinek kell lennie!");
      }

      return await this.milestoneModel.findOneAndUpdate(
        { _id: milestoneId },
        updateMilestoneDto,
        { new: true, runValidators: true }
      ).exec();
    }
  }

  async updateStatus(milestoneId: Types.ObjectId, userId: Types.ObjectId, updateMilestoneStatusDto: UpdateMilestoneStatusDto): Promise<Milestone> {
    let milestone = await this.milestoneModel.findById(milestoneId);

    if(!milestone) {
      throw new ApiError("A mérföldkő nem található!");
    }

    let thesis = await this.thesisModel.findById(milestone.thesis);
    let thesisLecturerId = (thesis.lecturer as User)._id;
    if(!thesisLecturerId.equals(userId)) {
      throw new ApiError("Hozzáférés megtagadva!");
    }

    milestone.status = updateMilestoneStatusDto.status;
    await milestone.save();
    return await this.milestoneModel.findOne({ _id: milestoneId }).exec();
  }

  async delete(milestoneId: Types.ObjectId, lecturerId: Types.ObjectId): Promise<Milestone> {
    let milestone = await this.milestoneModel.findById(milestoneId).exec();
    let thesis = await this.thesisModel.findById(milestone.thesis as Types.ObjectId);
    let thesisLecturerId = (thesis.lecturer as User)._id;

    if(!thesisLecturerId.equals(lecturerId)) {
      throw new ApiError("Hozzáférés megtagadva!");
    }

    let uploadsPath = `./uploads/milestones/${milestoneId}`;

    if(fs.existsSync(uploadsPath)){
      fs.rmdirSync(uploadsPath, { recursive: true });
    }

    return await this.milestoneModel.findOneAndRemove({ _id: milestoneId }).exec();
  }

  async createComment(milestoneId: Types.ObjectId, files: any, milestoneCommentDto: CreateMilestoneCommentDto): Promise<Milestone> {
    let milestone = await this.milestoneModel.findById(milestoneId).exec();

    let newComment = new this.milestoneCommentModel({
        author: milestoneCommentDto.author,
        body: milestoneCommentDto.body
    })
    await newComment.save();

    milestone.comments.push(newComment._id);

    if(files) {
      await Promise.all(files.map(async (file) => {
        let newPath = `${file.destination}/${milestoneId}`;

        if(!fs.existsSync(newPath)) {
          await fs.promises.mkdir(newPath, { recursive: true });
        }

        let fileName = file.originalname.split('.')[0];
        let fileExt = file.originalname.split('.')[1];
        let movedFilePath = `${newPath}/${fileName.split(" ").join("")}_${Date.now()}.${fileExt}`;

        await fs.rename(file.path, movedFilePath, (err) => {
          if(err) throw err;
        })
        newComment.files.push(movedFilePath);
      }));

      await newComment.save();
    }

    await milestone.save();

    return await this.milestoneModel.findById(milestoneId).exec();
  }

  async updateComment(milestoneId: Types.ObjectId, commentId: Types.ObjectId, userId: Types.ObjectId, updateMilestoneCommentDto: UpdateMilestoneCommentDto): Promise<Milestone> {
    let comment = await this.milestoneCommentModel.findOne({ _id: commentId, author: userId });

    if(!comment) {
      throw new ApiError("Nem található ilyen hozzászólás!");
    }

    comment.body = updateMilestoneCommentDto.body;
    await comment.save();

    return await this.milestoneModel.findById(milestoneId).exec();
  }

  async deleteComment(milestoneId: Types.ObjectId, commentId: Types.ObjectId, userId: Types.ObjectId): Promise<Milestone> {
    let comment = await this.milestoneCommentModel.findOne({ _id: commentId, author: userId });

    if(!comment) {
      throw new ApiError("Nem található ilyen hozzászólás!");
    }

    await Promise.all(comment.files.map(async (file) => {
      fs.unlink(file, (err) => {
        if (err)
          throw err;
      });
    }));

    await comment.remove();

    return await this.milestoneModel.findOneAndUpdate({ _id: milestoneId }, { $pull: { comments: commentId }}, { new: true }).exec();
  }
}
