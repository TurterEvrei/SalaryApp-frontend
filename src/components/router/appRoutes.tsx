import {Role} from "../../models/user/Role";
import {forAdmin, forManager, forMaster, forUser} from "../../utils/requiredRoles";
import CalcPage from "../../pages/CalcPage";
import AdminPage from "../../pages/AdminPage";
import ManagementPage from "../../pages/ManagementPage";
import SchedulePage from "../../pages/SchedulePage";
import StatisticPage from "../../pages/StatisticPage";
import Profile from "../../pages/Profile";

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
    {path: '/schedule',
        element: <SchedulePage/>,
        requiredRoles: forUser
    },
    {path: '/statistic',
        element: <StatisticPage/>,
        requiredRoles: forUser
    },
    {path: '/management',
        element: <ManagementPage/>,
        requiredRoles: forMaster
    },
    {path: '/admin',
        element: <AdminPage/>,
        requiredRoles: forAdmin
    },
    {path: '/profile',
        element: <Profile/>,
        requiredRoles: forUser
    },
]