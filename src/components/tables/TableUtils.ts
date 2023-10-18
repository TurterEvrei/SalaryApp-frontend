import {IEmployee} from "../../models/dto/IEmployee";
import React, {SetStateAction} from "react";
import {IUser} from "../../models/user/IUser";
import {IDepartment} from "../../models/dto/IDepartment";
import {IDailyReport} from "../../models/dto/IDailyReport";

export interface UserTableProps {
    employees: IEmployee[];
    setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>;
    setUsers: React.Dispatch<SetStateAction<IUser[]>>;
}

export interface DepsTableProps {
    employees: IEmployee[];
    setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>;
    setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>;
}

export interface EmpsTableProps {
    employees: IEmployee[];
    setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>;
    departments: IDepartment[];
    setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>;
    users: IUser[];
    setUsers: React.Dispatch<SetStateAction<IUser[]>>;
}

export interface ReportsTableProps {
    onOpen: () => any;
    setDailyReports: React.Dispatch<SetStateAction<IDailyReport[]>>
    setCurrentGlobalDailyReport: React.Dispatch<SetStateAction<IDailyReport>>
}