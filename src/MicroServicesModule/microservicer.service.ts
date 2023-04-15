import { Inject, Injectable } from '@nestjs/common';
import { CreateAnimalRequest } from './dto/create-animal-request.dto';

import { ClientProxy } from '@nestjs/microservices';
import { CreateAnimalEvent } from './event/create-animal.event';

@Injectable()
export class MicroservicerService {

  //DB em memória pra ficar mais simples
  private readonly animals: any[] = [];

  //Injetado lá no app modulo
  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
    @Inject('RMQ') private readonly rmqClient: ClientProxy) { }

  create(createAnimalRequest: CreateAnimalRequest) {
    this.animals.push(createAnimalRequest)
    this.communicationClient.emit('animal_created', new CreateAnimalEvent(createAnimalRequest.name))
  }
  createAnalytics(createAnimalRequest: CreateAnimalRequest) {
    this.animals.push(createAnimalRequest)
    this.analyticsClient.emit('analytics_created', new CreateAnimalEvent(createAnimalRequest.name))
  }

  getAnalytics() {
    //send returns a observable
    return this.analyticsClient.send({
      cmd: 'get_analytics'
    }, {})
  }

  createBilling() {
    //Mais utilizado pra comandos, tipo grpc
    this.rmqClient.send({ cmd: 'ian' }, {})
    //Mais utilizados pra transmitir dados
    this.rmqClient.emit('billing_created', {
      name: 'ian',
      value: '123',
    })
    return 'rmqCreated'
  }
}
