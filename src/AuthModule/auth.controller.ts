import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async autenticar(@Req() request: Request) {
    if (request.cookies['BBSSOToken'] != undefined) {
      const resposta = await this.authService.autenticar(request);
      return resposta;
    }

    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Favor logar no OpenAm',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
