import {Role} from "../../../../models/user/Role";
import {forAdmin, forMaster, forUser} from "../../../../utils/requiredRoles";

export interface link {
    name: string,
    path: string,
    iconClass: string,
    roles: Role[]
}

export interface submenu {
    subName: string,
    subPath: string
}

export const navLinkBottomList: link[] = [
    {name: 'Профиль',
        path: '/profile',
        iconClass: 'bi bi-person-lines-fill',
        roles: forUser},
    // {name: 'Выход',
    //     path: '/logout',
    //     iconClass: 'bi bi-box-arrow-right',
    //     roles: forUser},
]

export const navLinkMenuList: link[] = [
    {name: 'Калькулятор',
        path: '/calc',
        iconClass: 'bi bi-calculator-fill',
        roles: forMaster},
    {name: 'График',
        path: '/schedule',
        iconClass: 'bi bi-calendar4-range',
        roles: forUser},
    {name: 'Статистика',
        path: '/statistic',
        iconClass: 'bi bi-graph-up',
        roles: forUser},
    {name: 'Управление',
        path: '/management',
        iconClass: 'bi bi-diagram-3',
        roles: forMaster},
    {name: 'Админ. панель',
        path: '/admin',
        iconClass: 'bi bi-bar-chart-line',
        roles: forAdmin},

    // {name: 'Калькулятор',
    //     path: '/calc',
    //     iconClass: 'bi bi-calculator-fill',
    //     subMenu: null},
    // {name: 'Управление',
    //     path: '/management/reports',
    //     iconClass: 'bi bi-diagram-3',
    //     subMenu: [
    //         {subName: 'Отчеты', subPath: '/management/reports'},
    //         {subName: 'Работники', subPath: '/management/employees'},
    //         {subName: 'Таблицы', subPath: '/management/tables'},
    //     ]},
    // {name: 'Админ. панель',
    //     path: '/admin',
    //     iconClass: 'bi bi-bar-chart-line',
    //     subMenu: null},
    // {name: 'Профиль',
    //     path: '/profile',
    //     iconClass: 'bi bi-person-lines-fill',
    //     subMenu: null},
]