import {Role} from "../../models/user/Role";
import Calculator from "../calculator/Calculator";
import {forAdmin, forMaster} from "../../utils/requiredRoles";
import CalcPage from "../../pages/CalcPage";
import AdminPage from "../../pages/AdminPage";

export interface appRoute {
    path: string;
    element: React.ComponentType | any;
    requiredRoles: Role[];
}

export const appRoutesList: appRoute[] = [
    {path: '/calc',
        element: <CalcPage/>,
        requiredRoles: forMaster
    },
    {path: '/admin',
        element: <AdminPage/>,
        requiredRoles: forAdmin
    },

]