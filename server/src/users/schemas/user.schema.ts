import { plugin, pre, prop } from '@typegoose/typegoose';
import * as validator from './validators/user.validator';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
let userValidator = new validator.UserValidator();
import { DocumentType } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import * as uniqueValidator from 'mongoose-unique-validator';

interface User extends Base {}

@pre<User>('findOneAndUpdate', function(next: any) {
  if (!this._update || !this._update.password) {
    return next();
  }

  this._update.password = bcrypt.hashSync(this._update.password, 10);
  next();
})

@pre<User>('save', function(next: Function) {
  const user = this;

  if(!user.isModified('password')) {
    return next();
  }

  user.password = bcrypt.hashSync(user.password, 10);
  next();
})
@plugin(uniqueValidator, {
  message: 'A(z) {VALUE} már használatban van!'
})
class User extends TimeStamps {
  @prop({
    required: [
      function(this: DocumentType<User>) {
        return this.role !== 'ADMIN'
      },
      'NEPTUN megadása kötelező!'
    ],
    validate: {
      validator: function(this: DocumentType<User>, value) {
        if(this.role !== 'ADMIN') {
          return userValidator.neptunLengthValidator(value)
        }
      },
      message: 'Hibás NEPTUN kód!'
    },
    unique: true
  })
  neptun?: string;

  @prop({
    required: [true, 'Keresztnév megadása kötelező!'],
    validate: {
      validator: userValidator.firstNameLengthValidator,
      message: 'Keresztnév hossza legalább 4!'
    }
  })
  firstName!: string;

  @prop({
    required: [true, 'Vezetéknév megadása kötelező!'],
    validate: {
      validator: userValidator.lastNameLengthValidator,
      message: 'Vezetéknév hossza legalább 4!'
    }
  })
  lastName!: string;

  @prop({
    required: [true, 'Jelszó megadása kötelező!'],
    validate: [
      { validator: userValidator.passwordLengthValidator, message: 'A jelszó legalább 8 karakterből kell álljon!' }
    ]
  })
  password!: string;

  @prop({
    required: [true, 'Email megadása kötelező!'],
    validate: [
      { validator: userValidator.emailRegexValidator, message: 'Hibás email formátum!' }
    ],
    unique: true
  })
  email: string;

  @prop({
    required: [true, 'Jogosultság megadása kötelező!'],
    enum: ['STUDENT','LECTURER','ADMIN'],
    default: 'STUDENT'
  })
  role: string;
}

export default User;
