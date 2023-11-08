import React, {SetStateAction, useState} from 'react';
import {IUser} from "../../../models/user/IUser";
import {IEmployee} from "../../../models/dto/IEmployee";
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
import {Table as TanstackTable} from "@tanstack/table-core/build/lib/types";
import {Table} from "@chakra-ui/react";
import TableWrapperCard from "../../cards/TableWrapperCard";
import EditableCell from "../cells/EditableCell";
import StatusCell from "../cells/StatusCell";
import RoleCell from "./RoleCell";
import EmployeeCell from "./EmployeeCell";
import ActionsUserCell from "./ActionsUserCell";
import OptionsUserTable from "./OptionsUserTable";
import TableHead from "../addons/TableHead";
import TablePagination from "../addons/TablePagination";
import TableBody from "../addons/TableBody";

const columns: ColumnDef<IUser>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: false,
        //@ts-ignore
        cell: ({getValue}) => <div>{getValue()}</div>,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        enableColumnFilter: true,
        cell: EditableCell,
    },
    {
        accessorKey: 'password',
        header: 'Пароль',
        enableSorting: false,
        cell: EditableCell,
    },
    {
        accessorKey: 'name',
        header: 'Имя',
        cell: EditableCell,
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Телефон',
        enableSorting: false,
        cell: EditableCell,
    },
    {
        accessorKey: 'active',
        header: 'Статус',
        enableSorting: true,
        cell: StatusCell,
    },
    {
        accessorKey: 'roles',
        header: 'Роли',
        enableSorting: false,
        cell: RoleCell,
    },
    {
        accessorKey: 'employee',
        header: 'Работник',
        enableSorting: false,
        //@ts-ignore
        cell: EmployeeCell,
    },
    {
        accessorKey: 'actions',
        header: 'Действия',
        enableSorting: false,
        //@ts-ignore
        cell: ActionsUserCell,
    }
]

const UserTable = (
    {
        users,
        setUsers,
        employees,
        setEmployees,
    }: {
        users: IUser[],
        setUsers: React.Dispatch<SetStateAction<IUser[]>>,
        employees: IEmployee[],
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
    }
) => {
    const [changingIds, setChangingIds] = useState<number[]>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        password: false
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 7,
        pageIndex: 0,
    })

    const table: TanstackTable<IUser> = useReactTable({
        data: users,
        columns,
        state: {
            columnVisibility,
            columnFilters,
            pagination
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        meta: {
            updateData: (rowIndex: number, columnId: string, value: any) => {
                setUsers(
                    prev => prev.map((user, index) =>
                        index === rowIndex
                            ? {
                                ...prev[rowIndex],
                                [columnId]: value
                            }
                            : user
                    )
                )
                const userId = users[rowIndex].id
                //@ts-ignore
                setChangingIds([...changingIds.filter(id => id !== userId), userId])
            }
        }
    })

    // console.log(changingIds)

    return (
        <TableWrapperCard title={'Таблица пользователей'}>
            <>
                <OptionsUserTable table={table}
                                  columnFilters={columnFilters}
                                  setColumnFilters={setColumnFilters}
                                  setUsers={setUsers}
                                  users={users}
                                  changingIds={changingIds}
                                  setChangingIds={setChangingIds}
                />
                <Table variant='simple'>
                    <TablePagination table={table}
                                     setPagination={setPagination}
                    />
                    <TableHead table={table}/>
                    <TableBody table={table}
                               extraCellProps={{
                                   employees,
                                   setEmployees,
                                   setUsers
                               }}

                    />
                </Table>
            </>
        </TableWrapperCard>
    );
};

export default UserTable;