import {Role} from "./Role";

export interface IUserCred {
    id: number,
    email: string,
    roles: Role[],
    empId: number | null,
}