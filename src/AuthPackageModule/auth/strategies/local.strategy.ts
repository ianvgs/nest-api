import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
//Estrategia de usuario e senha do passport-local
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';




@Injectable()
//basicamente extrai email e password e passa pra frente, nem tem pq isso né... mas
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email', passReqToCallback: true });
    }

    validate(request: Request, email: string, password: string) {
        const { appId } = request.body
        if (!appId) {
            throw new BadRequestException("Não foi informado à qual aplicação está sendo direcionado este login.")
        }
        return this.authService.validateUser(email, password, appId);
    }
}