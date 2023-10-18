import React, {SetStateAction, useState} from 'react';
import {
    Button, Flex, Grid, Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton, MenuDivider,
    MenuItem,
    MenuList,
    MenuOptionGroup
} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, InfoIcon, SearchIcon} from "@chakra-ui/icons";
import {IEmployee} from "../../../models/dto/IEmployee";
import {IDepartment} from "../../../models/dto/IDepartment";

const AddEmployeeMenu = (
    {
        depEmployees,
        employees,
        currentDepartment,
        deleteEmployeeFromDepartment,
        addEmployeeToDepartment,
    }: {
        depEmployees: IEmployee[],
        employees: IEmployee[],
        currentDepartment: IDepartment,
        deleteEmployeeFromDepartment: (emp: IEmployee, dep: IDepartment) => void,
        addEmployeeToDepartment: (emp: IEmployee, dep: IDepartment) => void,
    }
) => {

    const [filterName, setFilterName] = useState<string>('')

    return (
        <Flex wrap='wrap' gap={1}>
            <>
                {depEmployees.map(emp =>
                    <Menu isLazy
                          offset={[0, 0]}
                          autoSelect={false}
                          key={emp.id}
                    >
                        <MenuButton as={Button}
                                    variant="outline"
                                    size="sm"
                                    key={emp.id}
                        >
                            {emp.name}
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<InfoIcon />}
                            >
                                Подробнее
                            </MenuItem>
                            <MenuItem icon={<DeleteIcon />}
                                      onClick={() => deleteEmployeeFromDepartment(
                                          emp,
                                          currentDepartment
                                      )}
                                //@ts-ignore
                            >
                                Удалить
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
                <Menu closeOnSelect={false}>
                    <MenuButton as={Button}
                                variant="outline"
                                size="sm"
                    >
                        <AddIcon/>
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
                            {employees.filter(e => !depEmployees.includes(e) && e.name.toLowerCase().includes(filterName.toLowerCase()))
                                .map(emp =>
                                    <MenuItem onClick={() => addEmployeeToDepartment(emp, currentDepartment)}
                                              key={emp.id}
                                    >
                                        {emp.name}
                                    </MenuItem>
                                )}
                        </Grid>
                    </MenuList>
                </Menu>
            </>
        </Flex>
    );
};

export default AddEmployeeMenu;