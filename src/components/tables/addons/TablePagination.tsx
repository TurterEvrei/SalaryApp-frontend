import React, {SetStateAction} from 'react';
import {Button, ButtonGroup, TableCaption, Text} from "@chakra-ui/react";
import {PaginationState, Table} from "@tanstack/react-table";

const TablePagination = (
    {
        table,
        setPagination,
    }: {
        table: Table<any>,
        setPagination: React.Dispatch<SetStateAction<PaginationState>>,
    }
) => {
    function nextPage() {
        setPagination(prev => {
            return {...prev, pageIndex: prev.pageIndex + 1}
        })
        // setPagination({...pagination, pageIndex: pagination.pageIndex + 1})
    }
    function prevPage() {
        setPagination(prev => {
            return {...prev, pageIndex: prev.pageIndex - 1}
        })
        // setPagination({...pagination, pageIndex: pagination.pageIndex - 1})
    }

    return (
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
    );
};

export default TablePagination;