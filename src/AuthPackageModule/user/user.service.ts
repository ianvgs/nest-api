import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { AdminUser } from './entities/admin-user.entity';
import { User } from './entities/user.entity';
import { ChangeAdminPassword } from './dto/change-admin-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'credentials_connection')
    private readonly userRepo: Repository<User>,
    @InjectRepository(AdminUser, 'credentials_connection')
    private readonly adminUserRepo: Repository<AdminUser>,
  ) { }


  async create(createUserDto: CreateUserDto) {
    console.log("createUserDto", createUserDto)
    const { name, email, password, appId, isAdmin } = createUserDto

    const verifyEmailInUse = await this.findByEmail(email)
    if (verifyEmailInUse) {
      throw new BadRequestException(
        `Oops! O e-mail informado já está sendo utilizado.`,
      );
    }

    const generateNewUser = this.userRepo.create({
      name,
      appId,
      isAdmin,
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

  async createAdminUser(createUserDto: CreateUserDto) {
    const { name, email, password, isAdmin } = createUserDto

    const verifyEmailInUse = await this.findAdminUserByEmail(email)
    if (verifyEmailInUse) {
      throw new BadRequestException(
        `Oops! O e-mail informado já está sendo utilizado.`,
      );
    }

    const generateNewUser = this.adminUserRepo.create({
      isAdmin,
      name,
      password: await bcrypt.hash(password, 10),
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.adminUserRepo.save(generateNewUser);

    //Ver como modificar na model pra não devolver o valor do password
    return {
      ...createdUser,
      password: undefined
    };
  }

  async changeAdminPassword(changeAdminPassword: ChangeAdminPassword) {
    const { email, password } = changeAdminPassword

    const photoToUpdate = await this.adminUserRepo.findOneBy({
      email
    })

    photoToUpdate.password = await bcrypt.hash(password, 10)
    return await this.adminUserRepo.save(photoToUpdate);


  }

  async findAdminUserByEmail(email: string) {
    return await this.adminUserRepo.findOne({
      where: {
        email
      },
    });
  }

}
