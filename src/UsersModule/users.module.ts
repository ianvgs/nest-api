import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { UserSchema } from 'src/UsersModule/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RmqModule } from 'src/RabbitMQModule/rmq.module';

@Module({
  imports: [
    // registra uma nova queue pra esse modulo +++ só aparece quando criado primeiro registro
    RmqModule.register({ name: 'TESTING' }),
    HttpModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
