import { Request } from "express";
import { Locale, PaginationDto, User, UserAdmin } from "src/internal";


export interface NoAuthRequest extends Request {
    settings: {
        locale: Locale,
        defaultLocale: Locale
    }
}
export interface AuthRequest extends NoAuthRequest {
    user: User & UserAdmin
}
export type AppRequest = AuthRequest | NoAuthRequest;


