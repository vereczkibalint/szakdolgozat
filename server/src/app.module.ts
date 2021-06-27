import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ThesesModule } from './theses/theses.module';
import { MilestonesModule } from './milestones/milestones.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { AuthModule } from './auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [AuthModule, ThesesModule, UsersModule, MilestonesModule, ConsultationsModule,
    TypegooseModule.forRoot('mongodb+srv://szakdolgozat:szakdolgozat@szakdolgozat.ccara.mongodb.net/szakdolgozat?retryWrites=true&w=majority', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
