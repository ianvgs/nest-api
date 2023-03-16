import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
    constructor(private readonly configService: ConfigService) { }
    getOptions(queue: string, noAck = true): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URI')],
                //vai criar uma queue com o nome .env<RABBIT_MQ_QUEUE>
                queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true,
            },
        };
    }
}
