import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User, 'news_connection')
    private readonly userRepo: Repository<User>,
  ) { }




  async create(createUserDto: CreateUserDto) {

    const { name, email, password } = createUserDto
    //verificar se ja tem alguem usando email....
    const generateNewUser = this.userRepo.create({
      name,
      password: await bcrypt.hash(password, 10),
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(generateNewUser)

    const createdUser = await this.userRepo.save(generateNewUser);

    //alterar depois pra algo melhor
    return {
      ...createdUser,
      password: undefined
    };
  }


  async findByEmail(email: string) {
    console.log('entrou no findemail')
    return await this.userRepo.findOne({
      where: {
        email
      },
    });
  }

}
