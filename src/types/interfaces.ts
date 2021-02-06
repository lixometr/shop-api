import { Request } from "express";
import { Locale, PaginationDto, User, UserAdmin , Currency} from "src/internal";


export interface NoAuthRequest extends Request {
    settings: {
        locale: Locale,
        currency: Currency
    }
}
export interface AuthRequest extends NoAuthRequest {
    user: User & UserAdmin
}
export type AppRequest = AuthRequest | NoAuthRequest;


