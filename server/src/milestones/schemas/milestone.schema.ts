import { plugin, prop, Ref } from '@typegoose/typegoose';
import Thesis from '../../theses/schemas/thesis.schema';
import * as validator from './validators/milestones.validator';
import * as autopopulate from 'mongoose-autopopulate';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import MilestoneComment from './milestone_comment.schema';

var milestoneValidator = new validator.MilestonesValidator();

interface Milestone extends Base {}
@plugin(autopopulate as any)
class Milestone extends TimeStamps {
  @prop({
    autopopulate: true,
    required: [true, 'Szakdolgozat megadása kötelező!'],
    ref: () => Thesis
  })
  thesis!: Ref<Thesis>;

  @prop({
    required: [true, 'Cím megadása kötelező!'],
    validate: [
      { validator: milestoneValidator.titleLengthValidator, message: 'A cím hossza legalább 3 karakterből kell álljon!' }
    ]
  })
  title!: string;

  @prop({
    required: [true, 'Leírás megadása kötelező!'],
    validate: [
      { validator: milestoneValidator.descriptionLengthValidator, message: 'A leírás legalább 5 karakterből kell álljon!' }
    ]
  })
  description!: string;

  @prop({
    required: [true, 'Határidő megadása kötelező!']
  })
  deadline!: Date;

  @prop({
    type: String,
    enum: ['accepted', 'rejected', 'pending'],
    default: 'pending'
  })
  status!: string;

  @prop({
    required: [true, 'Piszkozati mód megadása kötelező!'],
    default: false
  })
  isDraft!: boolean;

  @prop({
    autopopulate: true,
    ref: () => MilestoneComment
  })
  comments: Ref<MilestoneComment>[];

  @prop({
    type: String
  })
  tags: string[];
}

export default Milestone;