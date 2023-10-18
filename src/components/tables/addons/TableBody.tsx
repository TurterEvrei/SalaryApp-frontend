import React from 'react';
import {Tbody, Td, Tr} from "@chakra-ui/react";
import {flexRender, Table} from "@tanstack/react-table";
import {DepsTableProps, EmpsTableProps, ReportsTableProps, UserTableProps} from "../TableUtils";

const TableBody = (
    {
        table,
        extraCellProps,
    }: {
        table: Table<any>,
        extraCellProps?: UserTableProps | DepsTableProps | EmpsTableProps | ReportsTableProps,
    }
) => {
    return (
        <Tbody>
            {table.getRowModel()?.rows.map(row =>
                <Tr key={row.id}>
                    {row.getVisibleCells().map(cell =>
                        <Td key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                //@ts-ignore
                                {
                                    ...cell.getContext(),
                                    ...extraCellProps
                                    // employees,
                                    // setEmployees,
                                    // setUsers,
                                }
                            )}
                        </Td>
                    )}
                </Tr>
            )}
        </Tbody>
    );
};

export default TableBody;