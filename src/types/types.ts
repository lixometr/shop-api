import { EntityBase } from "src/internal";


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

export enum PublishStatus {
    Published = 'published',
    Draft = 'draft',
    NotPublished = 'not-published'
}

export type Serialized<T extends EntityBase> = T | { _isSerialized: true }