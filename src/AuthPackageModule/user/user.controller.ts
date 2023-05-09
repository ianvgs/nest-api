import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from 'src/AuthPackageModule/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/AuthPackageModule/auth/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /* @UseGuards(JwtAuthGuard) */
  @Get('me')
  whoAmI(@CurrentUser() user: User) {
    return user
  }

}
