import { BadRequestException, Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { CurrentUser } from 'src/AuthPackageModule/auth/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

//@GUARDS
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { UserFromJwt } from '../auth/models/UserFromJwt';
import { ROOT_USER } from '../../AuthPackageModule/constants'


/*@UseGuards(JwtAuthGuard) */

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto, @CurrentUser() user: UserFromJwt) {
    console.log(user)
    if (user.email != ROOT_USER.email) {
      throw new BadRequestException('Usuario não autorizado a criar novos usuários admin.');
    }
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin-user')
  createAdminUser(@Body() createUserDto: CreateUserDto, @CurrentUser() user: UserFromJwt) {
    if (user.email != ROOT_USER.email) {
      throw new BadRequestException('Usuario não autorizado a criar novos usuários admin.');
    }
    return this.userService.createAdminUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  whoAmI(@CurrentUser() user: User) {
    return user
  }
}
