import {Role} from "../models/user/Role";

export const forAdmin: Role[] = [Role.ADMIN]
export const forManager: Role[] = [Role.ADMIN, Role.MANAGER]
export const forMaster: Role[] = [Role.ADMIN, Role.MANAGER, Role.MASTER]
export const forUser: Role[] = [Role.ADMIN, Role.MANAGER, Role.MASTER, Role.USER]