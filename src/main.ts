import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
/* import { RmqService } from './RabbitMQModule/rmq.service'; */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  /* const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('TESTING', false));
  await app.startAllMicroservices(); */

  const configService = app.get(ConfigService);
  // da pra colocar o PORT no dotenv
  await app.listen(configService.get('PORT') || 3000);
  console.log(`App listenint at port ${configService.get('PORT') || 3000}`)
}
bootstrap();
