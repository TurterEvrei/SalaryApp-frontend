import {Role} from "./Role";

export interface IUserCred {
    email: string,
    roles: Role[],
}