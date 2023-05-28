import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminUser } from './entities/admin-user.entity';
@Module({
  imports: [TypeOrmModule.forFeature(
    [User, AdminUser],
    'credentials_connection'
  )],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
