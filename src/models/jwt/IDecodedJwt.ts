import {Role} from "../user/Role";

export interface IDecodedJwt {
    id: number,
    roles: Role[],
    sub: string,
    iat: number,
    exp: number,
}