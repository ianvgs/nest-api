import { Module } from '@nestjs/common';
import { MicroservicerService } from './microservicer.service';
import { MicroservicerController } from './microservicer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    /***RABBIT MQ DYNAMIC MODULE ***/
    /*  RmqModule.register({ name: 'TESTING' }), */

    /***RABBIT MQ MODULE STATIC WITH ASYNC ***/
    ClientsModule.registerAsync([{
      name: 'RMQ',
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBIT_MQ_URI')],
          queue: 'Rabbit',
        },
      }),
      inject: [ConfigService],
    },
    ]),
    ClientsModule.register([{
      name: 'COMMUNICATION',
      transport: Transport.TCP
    }, {
      name: 'ANALYTICS',
      transport: Transport.TCP,
      /*  options: {port: 3001} */
      //caso tivesse criado microservice com http listening
    }]),
  ],
  controllers: [MicroservicerController],
  providers: [MicroservicerService]
})
export class MicroservicerModule { }
