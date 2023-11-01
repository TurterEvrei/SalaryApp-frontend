import {Role} from "../user/Role";

export interface IDecodedJwt {
    id: number,
    roles: Role[],
    empId: number | null,
    sub: string,
    iat: number,
    exp: number,
}