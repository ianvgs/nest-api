import { BadRequestException, Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { CurrentUser } from 'src/AuthPackageModule/auth/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

//@GUARDS
import { IsPublic } from 'src/AuthPackageModule/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { AdminUser } from './entities/admin-user.entity';
import { CurrentAdminUser } from '../auth/decorators/current-admin-user.decorator';
/*@IsPublic() */
/*@UseGuards(JwtAuthGuard) */

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @UseGuards(JwtAuthGuard)
  /*@IsPublic() */
  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto, @CurrentUser() user: User) {
    console.log('postingUser', user)
    return this.userService.create(createUserDto);
  }

  /*@UseGuards(JwtAuthGuard) */
  /*@IsPublic() */
  @Post('admin-user')
  createAdminUser(@Body() createUserDto: CreateUserDto, /* @CurrentAdminUser() adminUser: AdminUser, */ /* @Req() req: Request */) {

    /*   console.log("reqqqqqqqqqq", req) */
    /* let rootUserId = 1
    if (user.id != rootUserId) {
      throw new BadRequestException('Usuario não autorizado a criar novos usuários admin.');
    } */

    /*     console.log("usuarioLogado", adminUser) */
    return this.userService.createAdminUser(createUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('user')
  whoAmI(@CurrentUser() user: User) {
    return user
  }



}
