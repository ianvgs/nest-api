import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicroservicerService } from './microservicer.service';
import { CreateAnimalRequest } from './dto/create-animal-request.dto';


@Controller('microservices')
export class MicroservicerController {
  constructor(private readonly microservicerService: MicroservicerService) { }

  @Post('/animal/')
  createAnimal(@Body() createAnimalRequest: CreateAnimalRequest) {
    console.log('animal')
    return this.microservicerService.create(createAnimalRequest);
  }

  @Post('/analytics')
  createAnalytics(@Body() createAnimalRequest: CreateAnimalRequest) {
    console.log('analytics')
    return this.microservicerService.createAnalytics(createAnimalRequest);
  }

  @Get('/analytics')
  getAnalitics() {
    return this.microservicerService.getAnalytics();
  }

  @Post('/billing')
  createBillings() {
    console.log('Billings')
    return this.microservicerService.createBilling();
  }



}
