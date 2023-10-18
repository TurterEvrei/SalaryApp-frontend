import React, {SetStateAction} from 'react';
import {ColumnFilter, Table} from "@tanstack/react-table";
import {IDepartment} from "../../../models/dto/IDepartment";
import {IEmployee} from "../../../models/dto/IEmployee";
import {Button, HStack, Input, InputGroup, InputLeftElement, Spacer, useDisclosure} from "@chakra-ui/react";
import DepartmentService from "../../../services/DepartmentService";
import {AddIcon, CheckIcon, SearchIcon} from "@chakra-ui/icons";
import ColumnVisiblityPopover from "../addons/ColumnVisiblityPopover";
import DepartmentModal from "../../modals/DepartmentModal";
import FilterPopover from "./FilterPopover";
import EmployeeModal from "../../modals/EmployeeModal";
import {IUser} from "../../../models/user/IUser";
import EmployeeService from "../../../services/EmployeeService";

const OptionsEmpsTable = (
    {
        table,
        columnFilters,
        setColumnFilters,
        changingIds,
        setChangingIds,
        departments,
        employees,
        setDepartments,
        setEmployees,
        users,
        setUsers,
    }: {
        table: Table<IEmployee>,
        columnFilters: ColumnFilter[],
        setColumnFilters: React.Dispatch<SetStateAction<ColumnFilter[]>>,
        changingIds: number[],
        setChangingIds: React.Dispatch<SetStateAction<number[]>>,
        departments: IDepartment[],
        employees: IEmployee[],
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
        users: IUser[],
        setUsers: React.Dispatch<SetStateAction<IUser[]>>,
    }
) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const nameValue = columnFilters.find(f => f.id === 'name')?.value || "";

    function onFilterChange(columnId: string, value: string) {
        setColumnFilters([
            ...columnFilters.filter(f => f.id !== columnId),
            {
                id: columnId,
                value: value,
            }
        ])
    }

    async function saveAllChanges() {
        //@ts-ignore
        const employeesToSave = employees.filter(e => changingIds.includes(e.id))
        const response = await EmployeeService.editEmployees(employeesToSave);
        response.data
            ? setChangingIds([])
            : console.log('Error while editing employees')
        console.log(response)
        console.log(employeesToSave)
    }

    return (
        <HStack mb={4}
                spacing={3}
        >
            <InputGroup w="auto">
                <InputLeftElement>
                    <SearchIcon/>
                </InputLeftElement>
                <Input onChange={e => onFilterChange("name", e.target.value)}
                    //@ts-ignore
                       value={nameValue}
                       placeholder="Название"
                />
            </InputGroup>
            <ColumnVisiblityPopover table={table}/>
            <FilterPopover columnFilters={columnFilters}
                           setColumnFilters={setColumnFilters}
                           departments={departments}
            />
            <Spacer/>
            <Button letterSpacing={1}
                    size="sm"
                    colorScheme="primary"
                    justifySelf="self-end"
                    onClick={saveAllChanges}
                    isDisabled={!changingIds.length}
            >
                <CheckIcon/>
            </Button>
            <Button letterSpacing={1}
                    size="sm"
                    colorScheme="primary"
                    justifySelf="flex-end"
                    onClick={onOpen}
            >
                <AddIcon/>
            </Button>
            <EmployeeModal isOpen={isOpen}
                           onClose={onClose}
                           departments={departments}
                           setDepartments={setDepartments}
                           setEmployees={setEmployees}
                           users={users}
                           setUsers={setUsers}
            />
        </HStack>
    );
};

export default OptionsEmpsTable;