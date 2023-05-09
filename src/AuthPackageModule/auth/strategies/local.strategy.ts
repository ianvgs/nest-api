import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
//Estrategia de usuario e senha do passport-local
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
//basicamente extrai email e password e passa pra frente, nem tem pq isso né... mas
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    validate(email: string, password: string) {
        return this.authService.validateUser(email, password);
    }
}