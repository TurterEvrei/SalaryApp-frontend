import React from 'react';
import {Table} from "@tanstack/react-table";
import {HStack, Th, Thead, Tr} from "@chakra-ui/react";
import {ArrowUpDownIcon, ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";

const TableHead = (
    {
        table,
    }: {
        table: Table<any>,
    }
) => {
    return (
        <Thead>
            {table.getHeaderGroups().map(headerGroup =>
                <Tr key={headerGroup.id}>
                    {headerGroup.headers.map(header =>
                        <Th key={header.id}>
                            <HStack>
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
                            </HStack>
                        </Th>
                    )}
                </Tr>
            )}
        </Thead>
    );
};

export default TableHead;