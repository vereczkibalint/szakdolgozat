import { Types } from 'mongoose';

export class UserDto {
  _id: Types.ObjectId;
  neptun?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}