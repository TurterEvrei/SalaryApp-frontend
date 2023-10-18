import React, {SetStateAction, useState} from 'react';
import {Column, Row, Table} from "@tanstack/react-table";
import {IEmployee} from "../../../models/dto/IEmployee";
import {
    Button,
    Flex, Grid,
    IconButton, Input,
    InputGroup, InputLeftElement,
    Menu,
    MenuButton, MenuDivider,
    MenuItem,
    MenuList,
    MenuOptionGroup
} from "@chakra-ui/react";
import {AddIcon, ChevronDownIcon, DeleteIcon, EditIcon, HamburgerIcon, InfoIcon, SearchIcon} from "@chakra-ui/icons";
import {IDepartment} from "../../../models/dto/IDepartment";
import AddEmployeeMenu from "./AddEmployeeMenu";

const EmployeesListCell = (
    {
        getValue,
        row,
        column,
        table,
        employees,
        setEmployees,
        setDepartments,
    }: {
        getValue: () => any,
        row: Row<any>,
        column: Column<any>,
        table: Table<any>,
        employees: IEmployee[],
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
    }
) => {
    const depEmployeesIds: number[] = getValue()
    // @ts-ignore
    const depEmployees = employees.filter(e => depEmployeesIds.includes(e.id))
    //@ts-ignore
    const {updateData} = table.options.meta

    function addEmployeeToDepartment(employee: IEmployee, department: IDepartment) {
        setEmployees([
            //@ts-ignore
            ...employees.filter(e => e.id !== employee.id),
            {
                ...employee,
                //@ts-ignore
                departments: [...employee.departments, department.id],
            }
        ])
        updateData(row.index, column.id, [...department.employees, employee.id])
    }

    function deleteEmployeeFromDepartment(employee: IEmployee, department: IDepartment) {
        setEmployees([
            ...employees.filter(e => e.id !== employee.id),
            {
                ...employee,
                departments: employee.departments.filter(id => id !== department.id),
            }
        ])
        updateData(row.index, column.id, department.employees.filter(id => id !== employee.id))
    }

    return (
        <AddEmployeeMenu employees={employees}
                         depEmployees={depEmployees}
                         currentDepartment={row.original}
                         addEmployeeToDepartment={addEmployeeToDepartment}
                         deleteEmployeeFromDepartment={deleteEmployeeFromDepartment}
        />
    );
};

export default EmployeesListCell;