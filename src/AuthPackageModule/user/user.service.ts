import { BadRequestException, Injectable } from '@nestjs/common';
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

    const verifyEmailInUse = await this.findByEmail(email)
    if (verifyEmailInUse) {
      throw new BadRequestException(
        `Oops! O e-mail informado já está sendo utilizado.`,
      );
    }

    const generateNewUser = this.userRepo.create({
      name,
      password: await bcrypt.hash(password, 10),
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepo.save(generateNewUser);

    //Ver como modificar na model pra não devolver o valor do password
    return {
      ...createdUser,
      password: undefined
    };
  }


  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email
      },
    });
  }

}
