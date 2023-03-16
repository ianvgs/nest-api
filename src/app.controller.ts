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
