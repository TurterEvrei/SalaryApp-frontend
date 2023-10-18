import React, {SetStateAction, useState} from 'react';
import {
    ColumnDef,
    ColumnFilter,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {IEmployee} from "../../../models/dto/IEmployee";
import EditableCell from "../cells/EditableCell";
import StatusCell from "../cells/StatusCell";
import {IDepartment} from "../../../models/dto/IDepartment";
import {Table} from "@chakra-ui/react";
import TablePagination from "../addons/TablePagination";
import TableHead from "../addons/TableHead";
import TableBody from "../addons/TableBody";
import TableWrapperCard from "../../cards/TableWrapperCard";
import OptionsEmpsTable from "./OptionsEmpsTable";
import {IUser} from "../../../models/user/IUser";
import UserCell from "./UserCell";
import DepartmentsListCell from "./DepartmentsListCell";
import actionsDepCell from "../departments/ActionsDepCell";
import ActionEmpCell from "./ActionEmpCell";

const columns: ColumnDef<IEmployee>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: false,
        //@ts-ignore
        cell: ({getValue}) => <div>{getValue()}</div>,
    },
    {
        accessorKey: 'name',
        header: 'Имя',
        enableColumnFilter: true,
        cell: EditableCell,
    },
    {
        accessorKey: 'active',
        header: 'Статус',
        //@ts-ignore
        cell: StatusCell,
    },
    {
        accessorKey: 'user',
        header: 'Пользователь',
        enableSorting: false,
        //@ts-ignore
        cell: UserCell,
    },
    {
        accessorKey: 'departments',
        header: 'Предприятия',
        enableSorting: false,
        //@ts-ignore
        cell: DepartmentsListCell,
        enableColumnFilter: true,
        filterFn: (row, columnId, filterValue) => {
            if (filterValue.length === 0) return true;
            const dep = row.getValue(columnId)
            //@ts-ignore
            return filterValue.every(v => dep.includes(v))
        }
    },
    {
        accessorKey: 'actions',
        header: 'Действия',
        enableSorting: false,
        //@ts-ignore
        cell: ActionEmpCell,
    },
]

const EmployeesTable = (
    {
        departments,
        setDepartments,
        employees,
        setEmployees,
        users,
        setUsers,
    }: {
        departments: IDepartment[],
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        employees: IEmployee[],
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
        users: IUser[],
        setUsers: React.Dispatch<SetStateAction<IUser[]>>,
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
        data: employees,
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
                setEmployees(prev =>
                    prev.map((emp, index) =>
                        rowIndex === index
                            ? {
                                ...emp,
                                [columnId]: data
                            }
                            : emp
                    )
                )
                const empId = employees[rowIndex].id
                //@ts-ignore
                setChangingIds([...changingIds.filter(id => id !== empId), empId])
            }
        }
    })

    return (
        <TableWrapperCard title={'Таблица работников'}>
            <>
                <OptionsEmpsTable table={table}
                                  columnFilters={columnFilters}
                                  setColumnFilters={setColumnFilters}
                                  departments={departments}
                                  changingIds={changingIds}
                                  setChangingIds={setChangingIds}
                                  employees={employees}
                                  setDepartments={setDepartments}
                                  setEmployees={setEmployees}
                                  users={users}
                                  setUsers={setUsers}
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
                                   departments,
                                   setDepartments,
                                   users,
                                   setUsers
                               }}
                    />
                </Table>
            </>
        </TableWrapperCard>
    );
};

export default EmployeesTable;