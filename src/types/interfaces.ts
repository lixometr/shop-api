import { Request } from "express";
import { Locale,  User, UserAdmin , Currency} from "src/internal";


export interface NoAuthRequest extends Request {
    settings: {
        locale: Locale,
        currency: Currency
    },
}
export interface AuthRequest extends NoAuthRequest {
    user: User 
}
export interface AuthAdminRequest extends NoAuthRequest {
    user: UserAdmin
}
export type AppRequest = AuthAdminRequest| AuthRequest | NoAuthRequest;


