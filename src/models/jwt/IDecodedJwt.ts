import {Role} from "../user/Role";

export interface IDecodedJwt {
    roles: Role[],
    sub: string,
    iat: number,
    exp: number,
}