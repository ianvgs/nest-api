import { Request } from "express";
import { AdminUser } from "src/AuthPackageModule/user/entities/admin-user.entity";

export class AdminAuthRequest extends Request {
    user: AdminUser;
}