import React, {SetStateAction} from 'react';
import ActionsCell from "../cells/ActionsCell";
import {useDisclosure} from "@chakra-ui/react";
import {IEmployee} from "../../../models/dto/IEmployee";
import {Column, Row, Table} from "@tanstack/react-table";
import {IDepartment} from "../../../models/dto/IDepartment";
import EmployeeModal from "../../modals/EmployeeModal";
import departmentsListCell from "./DepartmentsListCell";
import {IUser} from "../../../models/user/IUser";
import EmployeeService from "../../../services/EmployeeService";

const ActionEmpCell = (
    {
        getValue,
        row,
        column,
        table,
        setEmployees,
        setDepartments,
        employees,
        departments,
        users,
        setUsers,
    }: {
        getValue: () => any,
        row: Row<IEmployee>,
        column: Column<IEmployee>,
        table: Table<IEmployee>,
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        employees: IEmployee[],
        departments: IDepartment[],
        users: IUser[],
        setUsers: React.Dispatch<SetStateAction<IUser[]>>,
    }
) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const currentEmployee: IEmployee = row.original

    async function deleteEmployee(id: number) {
        const response = await EmployeeService.deleteEmployee(id)
        if (response.data) {
            setDepartments(departments.map(dep =>
                dep.employees.includes(id)
                    ? {...dep, employees: dep.employees.filter(eId => eId !== id)}
                    : dep
            ))
            setUsers(users.map(user =>
                user.employee === id
                    ? {...user, employee: null}
                    : user
            ))
            setEmployees(employees.filter(emp => emp.id !== id))
        } else {
            console.log('Error while deleting employee')
            console.log(response)
        }
    }

    return (
        <>
            <ActionsCell onInfoEntity={onOpen}
                         currentEntity={currentEmployee}
                         deleteEntity={deleteEmployee}
            />
            <EmployeeModal isOpen={isOpen}
                           onClose={onClose}
                           departments={departments}
                           users={users}
                           employee={currentEmployee}
                           setUsers={setUsers}
                           setEmployees={setEmployees}
                           setDepartments={setDepartments}
            />
        </>
    );
};

export default ActionEmpCell;