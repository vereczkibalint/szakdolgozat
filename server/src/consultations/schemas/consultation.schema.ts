import { plugin, pre, prop, Ref } from '@typegoose/typegoose';
import User from '../../users/schemas/user.schema';
import * as autopopulate from 'mongoose-autopopulate';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import ConsultationReservation from './consultation-reservations.schema';

interface Consultation extends Base {}
@pre<Consultation>('validate', function(next: Function) {
  const consultation = this;
  let today = new Date();

  if(consultation.startTime < today) {
    this.invalidate('startTime', 'A kezdés időpontja nem lehet a múltban!');
  }

  if(consultation.startTime > consultation.endTime) {
    this.invalidate('endTime', 'A befejezési időpontnak a kezdési időponttól későbbinek kell lennie!');
  }
  next();
})

@plugin(autopopulate as any)
class Consultation extends TimeStamps {
  @prop({
    autopopulate: { select: '-password' } ,
    required: [true, 'Oktató megadása kötelező!'],
    ref: () => User
  })
  lecturer!: Ref<User>;

  @prop({
    required: [true, 'Kezdés időpontjának megadása kötelező!'],
  })
  startTime!: Date;

  @prop({
    required: [true, 'Befejezés időpontjának megadása kötelező!']
  })
  endTime!: Date;

  @prop({
    required: [true, 'Helyszín megadása kötelező!']
  })
  location!: string;

  @prop({
    required: false
  })
  description: string;

  @prop({
    autopopulate: true,
    ref: () => ConsultationReservation,
    default: null
  })
  reservation?: Ref<ConsultationReservation>;
}

export default Consultation;
