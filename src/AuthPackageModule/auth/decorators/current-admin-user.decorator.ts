import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AdminUser } from 'src/AuthPackageModule/user/entities/admin-user.entity';
import { AdminAuthRequest } from '../models/AdminAuthRequest';


export const CurrentAdminUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): AdminUser => {
        const request = context.switchToHttp().getRequest<AdminAuthRequest>();
        return request.user;
    },
);