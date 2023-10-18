import {Role} from "../../models/user/Role";
import Calculator from "../calculator/Calculator";
import {forAdmin, forManager, forMaster} from "../../utils/requiredRoles";
import CalcPage from "../../pages/CalcPage";
import AdminPage from "../../pages/AdminPage";
import ManagementPage from "../../pages/ManagementPage";

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
    {path: '/management',
        element: <ManagementPage/>,
        requiredRoles: forManager
    },
    {path: '/admin',
        element: <AdminPage/>,
        requiredRoles: forAdmin
    },
]