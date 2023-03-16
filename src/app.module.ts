import { Module } from '@nestjs/common';

import { UsersModule } from './UsersModule/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModuler } from './MailerModule/mailer.module';

import { AppController } from './app.controller';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      //isglobal diz que vai valera pra todos
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }) /* 
            envFilePath :'./???' */,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MailerModuler,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
