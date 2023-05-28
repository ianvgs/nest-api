export interface UserPayload {
    sub: number;
    email: string;
    name: string;
    appId: number;
    isAdmin: boolean;
    iat?: number;
    exp?: number;

}