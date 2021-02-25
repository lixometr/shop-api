import { RelationOptions } from "typeorm"

export const ROLES_KEY = 'roles'
export const ROLES_ADMIN_KEY = 'roles_admin'
export const LOCALE_PROP = 'locale'


export const FILTER_PARAM = 'filters'

export const LOCALE_REL_OPTIONS: RelationOptions = { nullable: false, orphanedRowAction: 'delete', onDelete: 'CASCADE' }
export const DELETE_OPTIONS: RelationOptions = { nullable: false, orphanedRowAction: 'delete', onDelete: 'CASCADE' }
export const CASCADE_NOT_INSERT: ("insert" | "update" | "remove" | "soft-remove" | "recover")[] = ['update', 'remove', 'soft-remove', 'recover']