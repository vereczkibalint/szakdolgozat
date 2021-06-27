import { plugin, prop, Ref } from '@typegoose/typegoose';
import * as autopopulate from 'mongoose-autopopulate';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import User from '../../users/schemas/user.schema';
import * as validator from './validators/milestone_comments.validator';

let milestoneCommentValidator = new validator.MilestoneCommentsValidator();
interface MilestoneComment extends Base {}
@plugin(autopopulate as any)
class MilestoneComment extends TimeStamps {
  @prop({
    autopopulate: { select: '-password' },
    required: [true, 'Készítő megadása kötelező!'],
    ref: () => User
  })
  author!: Ref<User>;

  @prop({
    required: [true, 'Komment megadása kötelező!'],
    validate: [
      { validator: milestoneCommentValidator.bodyLengthValidator, message: 'Komment hossza legalább 3 karakter kell legyen!' }
    ]
  })
  body!: string;

  @prop()
  files: string[];
}

export default MilestoneComment;
