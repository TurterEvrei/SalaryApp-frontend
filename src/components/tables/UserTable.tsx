import React, {useEffect, useState} from 'react';
import {IUser} from "../../models/user/IUser";
import {IEmployee} from "../../models/dto/IEmployee";
import {
    ColumnDef,
    ColumnFilter, flexRender,
    getCoreRowModel,
    getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
    PaginationState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import UserService from "../../services/UserService";
import EmployeeService from "../../services/EmployeeService";
import {Table as TanstackTable} from "@tanstack/table-core/build/lib/types";
import Filters from "./Filters";
import {Button, ButtonGroup, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {ArrowUpDownIcon, ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import TableWrapperCard from "../cards/TableWrapperCard";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import RoleCell from "./RoleCell";
import EmployeeCell from "./EmployeeCell";
import ActionsCell from "./ActionsCell";

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
        cell: ActionsCell,
    }
]

const UserTable = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [employees, setEmployees] = useState<IEmployee[]>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        password: false
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0,
    })

    function nextPage() {
        setPagination({...pagination, pageIndex: pagination.pageIndex + 1})
    }
    function prevPage() {
        setPagination({...pagination, pageIndex: pagination.pageIndex - 1})
    }


    useEffect(() => {
        getAllUsers().then(() => getAllEmployees())
    }, [])

    async function getAllUsers() {
        const response = await UserService.fetchAllUsers()
        setUsers(response.data)
        // console.log(response.data)
    }

    async function getAllEmployees() {
        const response = await EmployeeService.fetchAllEmployees()
        setEmployees(response.data)
    }

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
            updateData: (rowIndex: number, columnId: string, value: any) => setUsers(
                prev => prev.map((user, index) =>
                    index === rowIndex
                        ? {
                            ...prev[rowIndex],
                            [columnId]: value
                        }
                        : user
                )
            )
        }
    })

    console.log(users)

    return (
        <TableWrapperCard>
            <>
                <Filters table={table}
                         columnFilters={columnFilters}
                         setColumnFilters={setColumnFilters}
                />
                <Table variant='simple'>
                    <TableCaption>
                        <Text mb={2}>
                            Стр. {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                        </Text>
                        <ButtonGroup size="sm"
                                     isAttached
                                     variant="outline"
                        >
                            <Button onClick={prevPage}
                                    isDisabled={!table.getCanPreviousPage()}
                            >
                                {"<"}
                            </Button>
                            <Button onClick={nextPage}
                                    isDisabled={!table.getCanNextPage()}
                            >
                                {">"}
                            </Button>
                        </ButtonGroup>
                    </TableCaption>
                    <Thead>
                        {table.getHeaderGroups().map(headerGroup =>
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map(header =>
                                    <Th key={header.id}>
                                        <>
                                            {header.column.columnDef.header}
                                            {header.column.getCanSort() && (
                                                {
                                                    asc: <ChevronDownIcon mx={3}
                                                                          onClick={header.column.getToggleSortingHandler()}
                                                    />,
                                                    desc: <ChevronUpIcon mx={3}
                                                                         onClick={header.column.getToggleSortingHandler()}
                                                    />,
                                                    no: <ArrowUpDownIcon mx={3}
                                                                         onClick={header.column.getToggleSortingHandler()}
                                                    />,
                                                }[header.column.getIsSorted() || 'no']
                                            )}
                                        </>
                                    </Th>
                                )}
                            </Tr>
                        )}
                    </Thead>
                    <Tbody>
                        {table.getRowModel()?.rows.map(row =>
                            <Tr key={row.id}>
                                {row.getVisibleCells().map(cell =>
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            //@ts-ignore
                                            {...cell.getContext(), employees, setEmployees}
                                        )}
                                    </Td>
                                )}
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </>
        </TableWrapperCard>
    );
};

export default UserTable;