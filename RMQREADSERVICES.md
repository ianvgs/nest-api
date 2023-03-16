COMO LER DA FILA:

LER AS MENSAGENS:
# 1) rmq.service.ts:
*** cria um módulo com service e module somente

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";

@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) {
    }
    getOptions(queue: string, noAck = true): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                //vai criar uma queue com o nome .env<RABBIT_MQ_QUEUE>
                queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true
            }
        }
    }
}

# 2)rmq.module.ts:

import { DynamicModule, Module } from "@nestjs/common";
import { RmqService } from "./rmq.service";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    providers: [RmqService],
    exports: [RmqService]
})
export class RmqModule {}

# 3)main.ts
## aqui você informa qual fila quer se conectar através do service.getOptions()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from './rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('TESTING'))
  await app.startAllMicroservices()

  await app.listen(configService.get('PORT');
}
bootstrap();

# 4) criar app.controller.ts e importar no controllers:[app.controllers.ts]

import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {

    @MessagePattern({ cmd: 'order_created' })
    getGreetingMessage(name: string): string {
        return `Hello ${name}`;
    }

    @EventPattern('order_created')
    async handleBookCreatedEvent(data: Record<string, unknown>) {
        console.log('To lendo a lista parça');
    }

}



