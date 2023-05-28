import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { NewsModule } from './NewsModule/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import DatabasesConfig from './config/databases.config';
import { AuthPackageModule } from './AuthPackageModule/auth-package.module';
import { UploaderModule } from './UploaderModule/uploader.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      load: [DatabasesConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      })
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'news_connection',
      useFactory: async (configService: ConfigService) => {
        return configService.get<DataSourceOptions>('database.news');
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'credentials_connection',
      useFactory: async (configService: ConfigService) => {
        return configService.get<DataSourceOptions>('database.credentials');
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    /*MailerModuler*/
    /*MicroServicesModule*/
    NewsModule,
    UploaderModule,
    AuthPackageModule
  ],
})
export class AppModule { }
