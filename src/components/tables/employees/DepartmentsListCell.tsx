import React, {SetStateAction} from 'react';
import {Column, Row, Table} from "@tanstack/react-table";
import {IEmployee} from "../../../models/dto/IEmployee";
import {IDepartment} from "../../../models/dto/IDepartment";
import AddEmployeeMenu from "../departments/AddEmployeeMenu";
import AddDepartmentMenu from "./AddDepartmentMenu";

const DepartmentsListCell = (
    {
        getValue,
        row,
        column,
        table,
        setDepartments,
        departments,
    }: {
        getValue: () => any,
        row: Row<any>,
        column: Column<any>,
        table: Table<any>,
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        departments: IDepartment[],
    }
) => {
    const empDepsIds: number[] = getValue()
    //@ts-ignore
    const empDeps = departments.filter(d => empDepsIds.includes(d.id))
    //@ts-ignore
    const {updateData} = table.options.meta

    function addEmployeeToDepartment(employee: IEmployee, department: IDepartment) {
        setDepartments([
            //@ts-ignore
            ...departments.filter(d => d.id !== department.id),
            {
                ...department,
                //@ts-ignore
                employees: [...department.employees, employee.id],
            }
        ])
        updateData(row.index, column.id, [...employee.departments, department.id])
    }

    function deleteEmployeeFromDepartment(employee: IEmployee, department: IDepartment) {
        setDepartments([
            ...departments.filter(d => d.id !== department.id),
            {
                ...department,
                employees: department.employees.filter(id => id !== employee.id),
            }
        ])
        updateData(row.index, column.id, employee.departments.filter(id => id !== department.id))
    }

    return (
        <AddDepartmentMenu departments={departments}
                         empDeps={empDeps}
                         currentEmployee={row.original}
                         addEmployeeToDepartment={addEmployeeToDepartment}
                         deleteEmployeeFromDepartment={deleteEmployeeFromDepartment}
        />
    );
};

export default DepartmentsListCell;