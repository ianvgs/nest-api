import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';


@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    //user guards roda antes de entrar na rota, se passar pro metodo async login, ja foi validade email e senha...
    @UseGuards(LocalAuthGuard)
    // UseGuards cria um user dentro do req. se tiver dado certo o login... com as informações....
    login(@Request() req: AuthRequest) {
        return this.authService.login(req.user)
    }

}
