import { Module } from '@nestjs/common';

import { UsersModule } from './UsersModule/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModuler } from './MailerModule/mailer.module';

import { AppController } from './app.controller';
import * as Joi from 'joi';
import { NewsModule } from './NewsModule/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import DatabasesConfig from './config/databases.config';
import { MicroservicerModule } from './microservicer/microservicer.module';
import { BancoIdeiasModule } from './BancoIdeiasModule/bancoIdeias.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      load: [DatabasesConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }) /* 
            envFilePath :'./???' */,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'news_database2',
      useFactory: async (configService: ConfigService) => {
        return configService.get<DataSourceOptions>('database.news');
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'banco_ideias',
      useFactory: async (configService: ConfigService) => {
        return configService.get<DataSourceOptions>('database.banco_ideias');
      },
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
    NewsModule,
    MicroservicerModule,
    BancoIdeiasModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
