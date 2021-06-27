import { plugin, prop, Ref } from '@typegoose/typegoose';
import User from '../../users/schemas/user.schema';
import * as validator from './validators/thesis_theme.validator';
import * as autopopulate from 'mongoose-autopopulate';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

var thesisValidator = new validator.ThesisThemeValidator();

interface ThesisTopic extends Base {}
@plugin(autopopulate as any)
@plugin(uniqueValidator, {
  message: 'Ilyen nevű téma már létezik!'
})
class ThesisTopic extends TimeStamps {
  @prop({
    autopopulate: { select: '-password' },
    required: [true, 'Oktató megadása kötelező!'],
    ref: () => User
  })
  lecturer!: Ref<User>;

  @prop({
    required: [true, 'Téma címének megadása kötelező!'],
    validate: [
      { validator: thesisValidator.titleLengthValidator, message: 'Cím legalább 5 karakterből kell álljon!' }
    ]
  })
  title!: string;
}

export default ThesisTopic;
