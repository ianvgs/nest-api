import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/AuthPackageModule/auth/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

//@GUARDS
import { IsPublic } from 'src/AuthPackageModule/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
/*@IsPublic() */
/*@UseGuards(JwtAuthGuard) */

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }


  /*   @UseGuards(JwtAuthGuard) */
  @Post('user')
  /*@IsPublic() */
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('user')
  whoAmI(@CurrentUser() user: User) {
    return user
  }

}
