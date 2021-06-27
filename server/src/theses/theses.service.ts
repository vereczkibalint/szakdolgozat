import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import Thesis from './schemas/thesis.schema';
import { CreateThesisDto } from './dto/CreateThesisDto';
import { UpdateThesisDto } from './dto/UpdateThesisDto';
import { Types } from 'mongoose';
import { CreateThesisTopicDto } from "./dto/CreateThesisTopicDto";
import { UpdateThesisTopicDto } from "./dto/UpdateThesisTopicDto";
import ApiError from "../exceptions/ApiError";
import User from "../users/schemas/user.schema";
import * as csvtojson from 'csvtojson';
import * as fs from "fs";
import ThesisTopic from "./schemas/thesis_topic.schema";
import Milestone from "../milestones/schemas/milestone.schema";

@Injectable()
export class ThesesService {
  constructor(@InjectModel(Thesis) private thesisModel: ReturnModelType<typeof Thesis>,
              @InjectModel(ThesisTopic) private thesisTopicModel: ReturnModelType<typeof ThesisTopic>,
              @InjectModel(Milestone) private readonly milestoneModel: ReturnModelType<typeof Milestone>          
  ) {}

  async fetchAll(lecturerId: Types.ObjectId) : Promise<Thesis[]> {
    return this.thesisModel.find({ lecturer: lecturerId }).exec();
  }

  async fetchByStudent(studentId: Types.ObjectId): Promise<Thesis> {
    return await this.thesisModel.findOne({ student: studentId }).exec();
  }

  async fetchById(thesisId: Types.ObjectId, lecturerId: Types.ObjectId): Promise<Thesis> {
    let thesis = await this.thesisModel.findById(thesisId).exec();
    if(!(thesis.lecturer as User)._id.equals(lecturerId)) {
      throw new ApiError("Hozzáférés megtagadva!");
    }

    return thesis;
  }

  async createThesis(createThesisDto: CreateThesisDto): Promise<Thesis> {
    const newThesis = new this.thesisModel(createThesisDto);
    await newThesis.save();

    return this.thesisModel.findById(newThesis._id);
  }

  async updateThesis(thesisId: Types.ObjectId, lecturerId: Types.ObjectId, updateThesisDto: UpdateThesisDto): Promise<Thesis> {
    let thesis = await this.thesisModel.findOne({ _id: thesisId, lecturer: lecturerId }).exec();

    if(!thesis) {
      throw new ApiError("Nincs ilyen szakdolgozat az adatbázisban!");
    }

    thesis.student = updateThesisDto.student;
    thesis.topic = updateThesisDto.topic;
    thesis.title = updateThesisDto.title;

    await thesis.save();

    return thesis;
  }

  async deleteThesis(thesisId: Types.ObjectId, lecturerId: Types.ObjectId): Promise<Thesis> {
    await this.cleanUpBeforeThesisDelete(thesisId);
    return await this.thesisModel.findOneAndRemove(
      { _id: thesisId, lecturer: lecturerId }
    ).exec();
  }

  async importThesisTopic(lecturerId: Types.ObjectId, filePath: string): Promise<ThesisTopic[]> {
    let jsonObj = await csvtojson({ delimiter: ';', noheader: true }).fromFile(filePath, { encoding: 'latin1' });

    await Promise.all(jsonObj.map(async (newTopic) => {
      let createThesisTopicDto = new CreateThesisTopicDto();
      createThesisTopicDto.lecturer = lecturerId;
      createThesisTopicDto.title = newTopic.field1;
      await this.createThesisTopic(createThesisTopicDto);
    }));
    await fs.unlink(filePath, (err) => {
      if(err) throw err;
    });

    return await this.fetchAllThesisTopic(lecturerId);
  }

  async fetchAllThesisTopic(lecturerId: Types.ObjectId): Promise<ThesisTopic[]> {
    return await this.thesisTopicModel.find({ lecturer: lecturerId }).exec();
  }

  async createThesisTopic(createThesisTopicDto: CreateThesisTopicDto): Promise<ThesisTopic> {
    const newThesisTopic = new this.thesisTopicModel(createThesisTopicDto);
    await newThesisTopic.save();

    return await this.thesisTopicModel.findById(newThesisTopic._id).exec();
  }

  async updateThesisTopic(topicId: Types.ObjectId, lecturerId: Types.ObjectId, updateThesisTopicDto: UpdateThesisTopicDto): Promise<ThesisTopic> {
    let thesisTopicToUpdate = await this.thesisTopicModel.findOne({ _id: topicId, lecturer: lecturerId }).exec();
    if(!thesisTopicToUpdate) {
      throw new ApiError("Nincs ilyen téma az adatbázisban!");
    }

    thesisTopicToUpdate.title = updateThesisTopicDto.title;
    await thesisTopicToUpdate.save();

    return await this.thesisTopicModel.findById(topicId).exec();
  }

  async deleteThesisTopic(lecturerId: Types.ObjectId, topicId: Types.ObjectId): Promise<ThesisTopic> {
    await this.cleanUpBeforeThesisTopicDelete(topicId);
    return await this.thesisTopicModel.findOneAndRemove({ _id: topicId, lecturer: lecturerId }).exec();
  }

  async cleanUpBeforeThesisDelete(thesisId: Types.ObjectId) {
    await this.milestoneModel.deleteMany({ thesis: thesisId }).exec();
  }

  async cleanUpBeforeThesisTopicDelete(thesisTopicId: Types.ObjectId) {
    await this.thesisModel.deleteMany({ topic: thesisTopicId }).exec();
  }

}
