import React, {SetStateAction} from 'react';
import {IDepartment} from "../../../models/dto/IDepartment";
import {ColumnFilter} from "@tanstack/react-table";
import {Flex} from "@chakra-ui/react";

const DepartmentItem = (
    {
        department,
        isActive,
        setColumnFilters,
    }: {
        department: IDepartment,
        isActive: boolean,
        setColumnFilters: React.Dispatch<SetStateAction<ColumnFilter[]>>,
    }
) => {

    function onClickHandler() {
        setColumnFilters(prev => {
            const deps = prev.find(f => f.id === 'departments')?.value
            if (!deps) {
                return prev.concat({
                    id: 'departments',
                    value: [department.id]
                })
            }
            return prev.map(f =>
                f.id === 'departments'
                    ? {
                        ...f,
                        value: isActive
                            // @ts-ignore
                            ? deps.filter(d => d !== department.id)
                            // @ts-ignore
                            : deps.concat(department.id)
                    }
                    : f
            )
        })
    }

    return (
        <Flex align='center'
              cursor='pointer'
              color='gray.300'
              borderRadius={5}
              ml={1}
              p={1}
              bg={
                  isActive ? "gray.800" : "transparent"
              }
              _hover={{
                  bg: "gray.800"
              }}
              onClick={onClickHandler}
        >
            {department.name}
        </Flex>
    );
};

export default DepartmentItem;