import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/AuthPackageModule/user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/AuthPackageModule/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined
                }
            }
        }
        throw new UnauthorizedException('Email address or password provided is incorrect.')
    }

    login(user: User): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        }

        const jwtToken = this.jwtService.sign(payload)

        return {
            access_token: jwtToken
        }
    }
}
