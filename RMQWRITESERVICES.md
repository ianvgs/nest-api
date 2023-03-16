ESCREVER NA FILA:

# 1)Importa o RMQ module no module em que deseja usar e "subscreve- registrar na fila".

import { Module } from '@nestjs/common';
import { RmqModule } from 'src/rmq/rmq.module';
@Module({
  imports: [
    // registra uma nova queue pra esse modulo +++ só aparece quando criado primeiro registro
    RmqModule.register({ name: 'TESTING' })],
})
export class UsersModule { }

# 2)Injeta no construtor da classe que quer usar:
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class UsersService {
  constructor(

    //O nome do cliente a ser usado - registrado no .module.ts desse modulo
    @Inject('TESTING') private userClient: ClientProxy
  ) {}

  async create(userData: CreateUserDto) {

      await lastValueFrom(
        this.userClient.emit('order_created', {
          userData
        })
      )
    }
}
