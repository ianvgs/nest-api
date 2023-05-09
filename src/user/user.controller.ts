import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @IsPublic()
  findAll() {
    return 'Teste'
  }

  @Get('me')
  @IsPublic()
  whoAmI(@CurrentUser() user: User) {
    console.log('entrei nessa rota')
    console.log(user)
    return user
  }

  /*   @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.remove(+id);
    } */
}
