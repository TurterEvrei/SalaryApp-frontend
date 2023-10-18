import React, {SetStateAction, useEffect, useState} from 'react';
import {
    ColumnDef, ColumnFilter,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel,
    PaginationState,
    useReactTable, VisibilityState
} from "@tanstack/react-table";
import {getValue} from "@testing-library/user-event/dist/utils";
import {IDepartment} from "../../../models/dto/IDepartment";
import TableWrapperCard from "../../cards/TableWrapperCard";
import TablePagination from "../addons/TablePagination";
import TableHead from "../addons/TableHead";
import TableBody from "../addons/TableBody";
import {Table} from "@chakra-ui/react";
import DepartmentService from "../../../services/DepartmentService";
import {IEmployee} from "../../../models/dto/IEmployee";
import OptionsDepsTable from "./OptionsDepsTable";
import EditableCell from "../cells/EditableCell";
import EditableNumberCell from "../cells/EditableNumberCell";
import EmployeesListCell from "./EmployeesListCell";
import ActionsDepCell from "./ActionsDepCell";

const columns: ColumnDef<IDepartment>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: false,
        //@ts-ignore
        cell: ({getValue}) => <div>{getValue()}</div>,
    },
    {
        accessorKey: 'name',
        header: 'Название',
        cell: EditableCell,
    },
    {
        accessorKey: 'employees',
        header: 'Работники',
        enableSorting: false,
        //@ts-ignore
        cell: EmployeesListCell,
    },
    {
        accessorKey: 'calcSetting',
        header: 'Коэф.',
        enableSorting: false,
        cell: EditableNumberCell,
    },
    {
        accessorKey: 'actions',
        header: 'Действия',
        enableSorting: false,
        //@ts-ignore
        cell: ActionsDepCell,
    },
]

const DepartmentTable = (
    {
        departments,
        setDepartments,
        employees,
        setEmployees,
    }: {
        departments: IDepartment[],
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        employees: IEmployee[],
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
    }
) => {

    const [changingIds, setChangingIds] = useState<number[]>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 7,
        pageIndex: 0,
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const table = useReactTable({
        data: departments,
        columns: columns,
        state: {
            pagination,
            columnFilters,
            columnVisibility,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        meta: {
            updateData: (rowIndex: number, columnId: string, data: any) => {
                setDepartments(prev =>
                    prev.map((dep, index) =>
                        rowIndex === index
                            ? {
                                ...dep,
                                [columnId]: data
                            }
                            : dep
                    )
                )
                const depId = departments[rowIndex].id
                //@ts-ignore
                setChangingIds([...changingIds.filter(id => id !== depId), depId])
            }
        }
    })

    return (
        <TableWrapperCard title={'Таблица предприятий'}>
            <>
            <OptionsDepsTable table={table}
                              columnFilters={columnFilters}
                              setColumnFilters={setColumnFilters}
                              departments={departments}
                              changingIds={changingIds}
                              setChangingIds={setChangingIds}
                              employees={employees}
                              setDepartments={setDepartments}
                              setEmployees={setEmployees}
            />
            <Table variant="simple">
                <TablePagination table={table}
                                 setPagination={setPagination}
                />
                <TableHead table={table}/>
                <TableBody table={table}
                           extraCellProps={{
                               employees,
                               setEmployees,
                               setDepartments,
                           }}
                />
            </Table>
            </>
        </TableWrapperCard>
    );
};

export default DepartmentTable;