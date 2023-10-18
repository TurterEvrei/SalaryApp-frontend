import React, {SetStateAction} from 'react';
import {Button, HStack, Input, InputGroup, InputLeftElement, Spacer, useDisclosure} from "@chakra-ui/react";
import {AddIcon, CheckIcon, SearchIcon} from "@chakra-ui/icons";
import ColumnVisiblityPopover from "../addons/ColumnVisiblityPopover";
import {ColumnFilter, Table} from "@tanstack/react-table";
import {IDepartment} from "../../../models/dto/IDepartment";
import DepartmentService from "../../../services/DepartmentService";
import DepartmentModal from "../../modals/DepartmentModal";
import {IEmployee} from "../../../models/dto/IEmployee";

const OptionsDepsTable = (
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
    }: {
        table: Table<IDepartment>,
        columnFilters: ColumnFilter[],
        setColumnFilters: React.Dispatch<SetStateAction<ColumnFilter[]>>,
        changingIds: number[],
        setChangingIds: React.Dispatch<SetStateAction<number[]>>,
        departments: IDepartment[],
        employees: IEmployee[],
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
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
        const departmentsToSave = departments.filter(dep => changingIds.includes(dep.id))
        const response = await DepartmentService.editDepartments(departmentsToSave);
        response.data
            ? setChangingIds([])
            : console.log('Error while editing departments')
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
            <DepartmentModal isOpen={isOpen}
                             onClose={onClose}
                             employees={employees}
                             setDepartments={setDepartments}
                             setEmployees={setEmployees}
            />
        </HStack>
    );
};

export default OptionsDepsTable;