import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { AdminAuthRequest } from './models/AdminAuthRequest';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @ApiTags('Login')
    @ApiOperation({
        summary: 'Realiza login de usuario não admin passando email,password,appId como parâmetros.',
    })
    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest) {
        console.log(req.user)
        return this.authService.generateToken(req.user)
    }

    @ApiTags('Login Admin')
    @ApiOperation({
        summary: 'Realiza login passando email,password,appId como parâmetros.',
    })
    @IsPublic()
    @Post('admin-login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    loginAdmin(@Request() req: AdminAuthRequest) {
        return this.authService.generateToken(req.user)
    }


}
