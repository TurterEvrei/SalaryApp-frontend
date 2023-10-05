import React, {SetStateAction, useState} from 'react';
import {
    Button,
    Grid,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    MenuOptionGroup
} from "@chakra-ui/react";
import {ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import {Column, Row, Table} from "@tanstack/react-table";
import {IUser} from "../../models/user/IUser";
import {IEmployee} from "../../models/dto/IEmployee";

const EmployeeCell = (
    {
        getValue,
        row,
        column,
        table,
        employees,
        setEmployees,
    }: {
        getValue: () => any,
        row: Row<IUser>,
        column: Column<IUser>,
        table: Table<IUser>,
        employees: IEmployee[],
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
    }
) => {

    const currentEmployee = employees.find(emp => emp.id === getValue())
    const [filterName, setFilterName] = useState<string>('')
    //@ts-ignore
    const {updateData} = table.options.meta

    return (
        <Menu isLazy
              offset={[0, 0]}>
            <MenuButton as={Button}
                        size="sm"
                        letterSpacing={1}
                        rightIcon={<ChevronDownIcon />}
                        colorScheme={currentEmployee ? 'green' : 'yellow'}>
                {currentEmployee?.name || "Нет"}
            </MenuButton>
            <MenuList minWidth='240px'>
                <MenuOptionGroup defaultValue='asc' title='Работники'>
                    <InputGroup w="auto"
                                size="sm"
                                mx={2}
                    >
                        <InputLeftElement>
                            <SearchIcon/>
                        </InputLeftElement>
                        <Input onChange={e => setFilterName(e.target.value)}/>
                    </InputGroup>
                </MenuOptionGroup>
                <MenuDivider />
                    <Grid templateColumns="1fr 1fr">
                        <MenuItem onClick={e => {
                                      updateData(row.index, column.id, null)
                                      setEmployees(employees.map(e =>
                                          e.id === currentEmployee?.id ? {...e, user: null} : e
                                      ))
                                  }}
                        >
                            Нет
                        </MenuItem>
                        {employees.filter(emp => !emp.user && emp.name.toLowerCase().includes(filterName.toLowerCase())).map(emp =>
                            <MenuItem onClick={e => {
                                          updateData(row.index, column.id, emp.id)
                                          // @ts-ignore
                                          setEmployees(employees.map(e =>
                                              e.id === emp.id ? {...e, user: row.getValue('id')} : e
                                          ).map(e => e.id === currentEmployee?.id ? {...e, user: null} : e))
                                      }}
                                      key={emp.id}
                            >
                                {emp.name}
                            </MenuItem>
                        )}
                    </Grid>
            </MenuList>
        </Menu>
    );
};

export default EmployeeCell;