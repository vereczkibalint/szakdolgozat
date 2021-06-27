import { plugin, prop, Ref } from '@typegoose/typegoose';
import User from '../../users/schemas/user.schema';
import * as validator from './validators/thesis.validator';
import * as autopopulate from 'mongoose-autopopulate';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import ThesisTopic from "./thesis_topic.schema";

var thesisValidator = new validator.ThesisValidator();

interface Thesis extends Base {}
@plugin(autopopulate as any)
@plugin(uniqueValidator, {
  message: 'Ehhez a hallgatóhoz már tartozik szakdolgozat!'
})
class Thesis extends TimeStamps {
  @prop({
    autopopulate: { select: '-password' },
    required: [true, 'Oktató megadása kötelező!'],
    ref: () => User
  })
  lecturer!: Ref<User>;

  @prop({
    autopopulate: { select: '-password' },
    required: [true, 'Hallgató megadása kötelező!'],
    ref: () => User,
    unique: true
  })
  student!: Ref<User>;

  @prop({
    autopopulate: true,
    required: [true, 'Téma megadása kötelező!'],
    ref: () => ThesisTopic
  })
  topic!: Ref<ThesisTopic>;

  @prop({
    required: [true, 'Cím megadása kötelező!'],
    validate: [
      { validator: thesisValidator.titleLengthValidator, message: 'Cím legalább 5 karakterből kell álljon!' }
    ]
  })
  title!: string;
}

export default Thesis;
