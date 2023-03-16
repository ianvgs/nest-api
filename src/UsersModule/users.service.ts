import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User } from './entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectConnection() connection: Connection,
    private readonly httpService: HttpService,

    //O nome do cliente a ser usado - registrado no .module.ts desse modulo
    @Inject('TESTING') private userClient: ClientProxy,
  ) { }

  async create(userData: CreateUserDto) {
    const session = await this.userModel.startSession();
    session
      .withTransaction(() => {
        return this.userModel.create([userData], { session: session });
      })
      .then(async () => {
        await lastValueFrom(
          this.userClient.emit('order_created', {
            userData,
          }),
        );
      })
      .then(() => {
        session.endSession();
      })
      .catch(() => {
        session.abortTransaction();
      });
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<any[]>(`https://reqres.in/api/users/${id}`).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    const res: any = { ...data };
    return res.data;
  }
}
