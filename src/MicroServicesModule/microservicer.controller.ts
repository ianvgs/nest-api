import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicroservicerService } from './microservicer.service';
import { CreateAnimalRequest } from './dto/create-animal-request.dto';


@Controller('microservices')
export class MicroservicerController {
  constructor(private readonly microservicerService: MicroservicerService) { }

  @Post('/animal/')
  createAnimal(@Body() createAnimalRequest: CreateAnimalRequest) {
    return this.microservicerService.create(createAnimalRequest);
  }

  @Post('/analytics')
  createAnalytics(@Body() createAnimalRequest: CreateAnimalRequest) {
    return this.microservicerService.createAnalytics(createAnimalRequest);
  }

  @Get('/analytics')
  getAnalitics() {
    return this.microservicerService.getAnalytics();
  }

  @Post('/billing')
  createBillings() {
    return this.microservicerService.createBilling();
  }



}
