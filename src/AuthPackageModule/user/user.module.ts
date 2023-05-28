import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AdminUser } from './entities/admin-user.entity';
//import { APP_GUARD } from '@nestjs/core';
//Replica pra todos os modulos
/* import { JwtAuthGuard } from 'src/AuthPackageModule/auth/guards/jwt-auth-guard';
  providers: [UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
*/



@Module({
  imports: [TypeOrmModule.forFeature(
    [User, AdminUser],
    'credentials_connection'
  )],
  controllers: [UserController],
  providers: [UserService,
    /* {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    } */
  ],
  exports: [UserService]
})
export class UserModule { }
