import { Injectable, Scope} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import User from './schemas/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import * as csvtojson from 'csvtojson';
import { ImportUserDto } from './dto/ImportUserDto';
import * as fs from 'fs';
import ApiError from "../exceptions/ApiError";
import Thesis from "../theses/schemas/thesis.schema";
import ConsultationReservation from "../consultations/schemas/consultation-reservations.schema";
import MilestoneComment from "../milestones/schemas/milestone_comment.schema";
import ThesisTopic from "../theses/schemas/thesis_topic.schema";

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Thesis) private readonly thesisModel: ReturnModelType<typeof Thesis>,
    @InjectModel(MilestoneComment) private readonly milestoneCommentModel: ReturnModelType<typeof MilestoneComment>,
    @InjectModel(ConsultationReservation) private readonly consultationReservationModel: ReturnModelType<typeof ConsultationReservation>,
    @InjectModel(ThesisTopic) private readonly thesisTopicModel: ReturnModelType<typeof ThesisTopic>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().select({ 'password': 0 }).exec();
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).select({ 'password': 0 }).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).select({ 'password': 0 }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
      const { _id: id } = await this.userModel.create(createUserDto as User);
      return await this.userModel.findById(id).exec();
  }

  async updateUser(userId: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { _id:  userId },
      updateUserDto,
      { new: true, context: 'query' }
    ).select({ 'password': 0 }).exec();
  }

  async changePassword(userId: Types.ObjectId, changePasswordDto: ChangePasswordDto): Promise<User> {
    const user = await this.userModel.findById(userId);

    if(!user) {
      throw new ApiError('Nincs felhasználó ezzel az azonosítóval!');
    }

    if(!bcrypt.compareSync(changePasswordDto.oldPassword, user.password)) {
      throw new ApiError('Hibás jelenlegi jelszó!');
    }

    user.password = changePasswordDto.password;
    await user.save();

    return this.userModel.findById(userId).select({ password: 0 }).exec();
  }

  async deleteStudent(studentId: Types.ObjectId): Promise<User> {
    await this.cleanUp(studentId);
    return await this.userModel.findOneAndRemove({ _id: studentId, role: 'STUDENT' }).select({ 'password': 0 }).exec();
  }

  async deleteUser(userId: Types.ObjectId): Promise<User> {
    await this.cleanUp(userId);
    return this.userModel.findOneAndRemove({ _id: userId }).select({ 'password': 0 }).exec();
  }

  async cleanUp(userId: Types.ObjectId) {
    await this.thesisModel.findOneAndDelete({ student: userId }).exec();
    await this.thesisModel.findOneAndDelete({ lecturer: userId }).exec();
    await this.milestoneCommentModel.deleteMany({ author: userId }).exec();
    await this.consultationReservationModel.deleteMany({ student: userId }).exec();
    await this.thesisTopicModel.deleteMany({ lecturer: userId }).exec();
  }

  async importUsers(filePath: string, userType: string): Promise<User[]> {
    if(!['STUDENT','LECTURER','ADMIN'].includes(userType)) {
      throw new ApiError("Hibás felhasználótípus!");
    }

    let jsonObj = await csvtojson({ delimiter: ';', noheader: true }).fromFile(filePath, { encoding: 'latin1' });
    await Promise.all(jsonObj.map(async (newUser) => {
      let importUserDto = new ImportUserDto();
      importUserDto.lastName = newUser.field1;
      importUserDto.firstName = newUser.field2;
      if(userType !== 'ADMIN') {
        importUserDto.neptun = newUser.field3;
        importUserDto.email = newUser.field4;
		importUserDto.password = `EKE_${importUserDto.neptun}`;
      } else {
        importUserDto.email = newUser.field3;
		importUserDto.password = `EKE_${importUserDto.lastName}`;
      }
      importUserDto.role = userType;
      await this.createUser(importUserDto);
    }));
    await fs.unlink(filePath, (err) => {
      if(err) throw err;
    });
    return await this.findByRole(userType);
  }
}
