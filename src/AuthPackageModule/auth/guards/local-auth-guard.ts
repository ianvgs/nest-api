import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//SOMENTE DISPONIVEL NA ROTA DE LOGIN
export class LocalAuthGuard extends AuthGuard('local') {
    //pode ativar e permitir acessar
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user) {
        if (err || !user) {
            throw new UnauthorizedException(err?.message);
        }

        return user;
    }
}