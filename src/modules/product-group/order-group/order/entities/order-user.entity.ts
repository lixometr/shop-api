import { ID, Roles, User } from "src/internal"
export type OrderUserType = Pick<User, "email" | "firstName" | "id" | "role">;
export class OrderUser implements OrderUserType {
    email: string
    firstName: string
    id: ID
    role: Roles
}