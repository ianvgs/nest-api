import { BadRequestException, Body, Controller, Get, Post, UseGuards, Req, Put } from '@nestjs/common';
import { CurrentUser } from 'src/AuthPackageModule/auth/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

//@GUARDS
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { UserFromJwt } from '../auth/models/UserFromJwt';
import { ROOT_ADMIN_USER } from '../../AuthPackageModule/constants'
import { ChangeAdminPassword } from './dto/change-admin-password.dto';


/*@UseGuards(JwtAuthGuard) */

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto, @CurrentUser() user: UserFromJwt) {
    console.log(user)
    if (user.email != ROOT_ADMIN_USER.email && user.id != ROOT_ADMIN_USER.id) {
      throw new BadRequestException('Usuario não autorizado a criar novos usuários admin.');
    }

    if (user.email == ROOT_ADMIN_USER.email && user.id == ROOT_ADMIN_USER.id) {
      console.log("Logado como usuario:", user.email)
    }
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin-user')
  createAdminUser(@Body() createUserDto: CreateUserDto, @CurrentUser() user: UserFromJwt) {
    if (user.email != ROOT_ADMIN_USER.email && user.id != ROOT_ADMIN_USER.id) {
      throw new BadRequestException('Usuario não autorizado a criar novos usuários admin.');
    }

    if (user.email == ROOT_ADMIN_USER.email && user.id == ROOT_ADMIN_USER.id) {
      console.log("Logado como usuario:", user.email)
    }
    return this.userService.createAdminUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin-password')
  changeAdminPassword(@Body() changeAdminPassword: ChangeAdminPassword) {
    return 'Método utilizado momentaneamente para alterar as senhas de admins'
    //return this.userService.changeAdminPassword(changeAdminPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  whoAmI(@CurrentUser() user: User) {
    console.log("CHEGA AQUI")
    return user
  }
}
