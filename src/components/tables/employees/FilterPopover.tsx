import React, {SetStateAction} from 'react';
import {ColumnFilter} from "@tanstack/react-table";
import {
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Text,
    VStack,
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {IDepartment} from "../../../models/dto/IDepartment";
import DepartmentItem from "./DepartmentItem";

const FilterPopover = (
    {
        columnFilters,
        setColumnFilters,
        departments,
    }: {
        columnFilters: ColumnFilter[],
        setColumnFilters: React.Dispatch<SetStateAction<ColumnFilter[]>>,
        departments: IDepartment[],
    }
) => {
    // @ts-ignore
    const filterDeps: number[] = columnFilters.find(
        f => f.id === 'departments'
    )?.value || []

    return (
        <Popover isLazy>
            <PopoverTrigger>
                <Button size="sm"
                        colorScheme={filterDeps.length > 0 ? 'primary' : 'gray'}
                        leftIcon={
                            <ChevronDownIcon/>
                        }
                >
                    Предпр.
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <Text mb={2}>
                        Предприятия:
                    </Text>
                    <VStack align='flex-start' spacing={1}>
                        {
                            departments.map(dep =>
                                <DepartmentItem department={dep}
                                                //@ts-ignore
                                                isActive={filterDeps.includes(dep.id)}
                                                setColumnFilters={setColumnFilters}
                                                key={dep.id}
                                />
                            )
                        }
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default FilterPopover;