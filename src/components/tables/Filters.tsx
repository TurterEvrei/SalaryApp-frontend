import React, {SetStateAction} from 'react';
import {
    Box,
    Button, Grid, HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Popover,
    PopoverArrow, PopoverBody, PopoverCloseButton,
    PopoverContent, PopoverHeader,
    PopoverTrigger
} from "@chakra-ui/react";
import {DragHandleIcon, SearchIcon} from "@chakra-ui/icons";
import CheckboxToggleWithLabel from "../UI/checkbox/CheckboxToggleWithLabel";
import {IUser} from "../../models/user/IUser";
import {ColumnFilter, Table} from "@tanstack/react-table";

const Filters = (
    {
        table,
        columnFilters,
        setColumnFilters,
    }: {
        table: Table<IUser>,
        columnFilters: ColumnFilter[],
        setColumnFilters: React.Dispatch<SetStateAction<ColumnFilter[]>>,
    }
) => {

    const emailValue = columnFilters.find(f => f.id === 'email')?.value || ""

    function onFilterChange(id: string, value: string) {
        setColumnFilters([
            ...columnFilters.filter(f => f.id !== id),
            {
                id: id,
                value: value,
            }
        ])
    }

    return (
        <HStack mb={4}
                spacing={3}
        >
            <InputGroup w="auto">
                <InputLeftElement>
                    <SearchIcon/>
                </InputLeftElement>
                <Input onChange={e => onFilterChange("email", e.target.value)}
                       //@ts-ignore
                       value={emailValue}
                />
            </InputGroup>
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
                                <Box justifyContent="center">
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
        </HStack>
    );
};

export default Filters;