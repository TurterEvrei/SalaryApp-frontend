import React from 'react';
import {
    Box,
    Button, Grid, Popover,
    PopoverArrow, PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger
} from "@chakra-ui/react";
import {DragHandleIcon} from "@chakra-ui/icons";
import CheckboxToggleWithLabel from "../../UI/checkbox/CheckboxToggleWithLabel";
import {Table} from "@tanstack/react-table";

const ColumnVisiblityPopover = (
    {
        table,
    }: {
        table: Table<any>,
    }
) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button size="sm">
                    <DragHandleIcon/>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Выбор колонок</PopoverHeader>
                <PopoverBody boxShadow="dark-lg">
                    <Grid templateColumns="1fr 1fr"
                          gap={2}
                    >
                        {table.getAllColumns().map(column =>
                            <Box justifyContent="center"
                                 key={column.id}
                            >
                                <CheckboxToggleWithLabel onChange={e =>
                                    column.toggleVisibility(e.target.checked)
                                }
                                    //@ts-ignore
                                                         label={column.columnDef.header}
                                                         checked={column.getIsVisible()}
                                />
                            </Box>
                        )}
                    </Grid>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default ColumnVisiblityPopover;