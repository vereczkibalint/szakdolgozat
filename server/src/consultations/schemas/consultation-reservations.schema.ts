import { plugin, pre, prop, Ref } from '@typegoose/typegoose';
import User from '../../users/schemas/user.schema';
import Consultation from './consultation.schema';
import * as autopopulate from 'mongoose-autopopulate';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

interface ConsultationReservation extends Base {}

@plugin(autopopulate as any)
class ConsultationReservation extends TimeStamps {
  @prop({
    required: [true, 'Konzultáció megadása kötelező!'],
    ref: () => Consultation
  })
  consultation!: Ref<Consultation>;

  @prop({
    autopopulate: { select: '-password' },
    required: [true, 'Hallgató megadása kötelező!'],
    ref: () => User
  })
  student!: Ref<User>
}

export default ConsultationReservation;