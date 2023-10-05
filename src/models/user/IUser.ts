import {Role} from "./Role";

export interface IUser {
    id?: number;
    email: string;
    password?: string;
    name: string;
    phoneNumber: string;
    active: boolean;
    roles: Role[];
    employee?: number;
}