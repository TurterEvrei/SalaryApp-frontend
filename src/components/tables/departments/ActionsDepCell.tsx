import React, {SetStateAction, useEffect, useState} from 'react';
import {Column, Row, Table} from "@tanstack/react-table";
import {IEmployee} from "../../../models/dto/IEmployee";
import ActionsCell from "../cells/ActionsCell";
import {IDepartment} from "../../../models/dto/IDepartment";
import DepartmentService from "../../../services/DepartmentService";
import {useDisclosure} from "@chakra-ui/react";
import DepartmentModal from "../../modals/DepartmentModal";

const ActionsDepCell = (
    {
        getValue,
        row,
        column,
        table,
        setEmployees,
        setDepartments,
        employees,
    }: {
        getValue: () => any,
        row: Row<IDepartment>,
        column: Column<IDepartment>,
        table: Table<IDepartment>,
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        employees: IEmployee[],
    }
) => {
    const currentDepartment = row.original
    const {isOpen, onOpen, onClose} = useDisclosure()

    async function deleteDepartment(id: number) {
        const response = await DepartmentService.deleteDepartment(id)
        if (response.data) {
            setDepartments(prev => prev.filter(dep => dep.id !== id))
            setEmployees(prev => prev.map(emp =>
                emp.departments.includes(id)
                    ? {...emp, departments: emp.departments.filter(depId => depId !== id)}
                    : emp
            ))
        } else {
            console.log('Error while deleting department')
        }
    }

    return (
        <>
            <ActionsCell currentEntity={currentDepartment}
                         deleteEntity={deleteDepartment}
                         onInfoEntity={onOpen}
            />
            <DepartmentModal isOpen={isOpen}
                             onClose={onClose}
                             employees={employees}
                             setDepartments={setDepartments}
                             setEmployees={setEmployees}
                             department={currentDepartment}
            />
        </>
    );
};

export default ActionsDepCell;