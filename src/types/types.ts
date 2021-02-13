

export type ID = number;
export type SLUG = string;

export enum UserGroup {
    Admin = 'admin',
    User = 'user'
}


export enum SerializeGroup {
    Admin = 'admin',
    AdminFull = 'adminFull',
    AdminInfo = 'adminInfo',
    User = 'user',
    Info = 'info',
    Full = 'full',
    Translate = 'translate'
}