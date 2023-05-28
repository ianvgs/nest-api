export interface UserPayload {
    sub: number;
    email: string;
    name: string;
    appId: number;
    isAdmin: number;
    iat?: number;
    exp?: number;

}