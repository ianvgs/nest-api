import { Module } from '@nestjs/common';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ttl: configService.getOrThrow("UPLOAD_RATE_TTL"),
        limit: configService.getOrThrow("UPLOAD_RATE_LIMIT")
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [UploaderController],
  providers: [UploaderService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }]
})
export class UploaderModule { }
