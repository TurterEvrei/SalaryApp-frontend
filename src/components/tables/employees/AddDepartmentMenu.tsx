import React, {useState} from 'react';
import {IEmployee} from "../../../models/dto/IEmployee";
import {IDepartment} from "../../../models/dto/IDepartment";
import {
    Button,
    Flex, Grid, Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton, MenuDivider,
    MenuItem,
    MenuList,
    MenuOptionGroup
} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, InfoIcon, SearchIcon} from "@chakra-ui/icons";

const AddDepartmentMenu = (
    {
        empDeps,
        departments,
        currentEmployee,
        deleteEmployeeFromDepartment,
        addEmployeeToDepartment,
    }: {
        empDeps: IDepartment[],
        departments: IDepartment[],
        currentEmployee: IEmployee,
        deleteEmployeeFromDepartment: (emp: IEmployee, dep: IDepartment) => void,
        addEmployeeToDepartment: (emp: IEmployee, dep: IDepartment) => void,
    }
) => {

    const [filterName, setFilterName] = useState<string>('')

    return (
        <Flex wrap='wrap' gap={1}>
            <>
                {empDeps.map(dep =>
                    <Menu isLazy
                          offset={[0, 0]}
                          autoSelect={false}
                          key={dep.id}
                    >
                        <MenuButton as={Button}
                                    variant="outline"
                                    size="sm"
                                    key={dep.id}
                        >
                            {dep.name}
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<InfoIcon />}
                            >
                                Подробнее
                            </MenuItem>
                            <MenuItem icon={<DeleteIcon />}
                                      onClick={() => deleteEmployeeFromDepartment(
                                          currentEmployee,
                                          dep
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
                            {departments.filter(dep => !empDeps.includes(dep) && dep.name.toLowerCase().includes(filterName.toLowerCase()))
                                .map(department =>
                                    <MenuItem onClick={() => addEmployeeToDepartment(currentEmployee, department)}
                                              key={department.id}
                                    >
                                        {department.name}
                                    </MenuItem>
                                )}
                        </Grid>
                    </MenuList>
                </Menu>
            </>
        </Flex>
    );
};

export default AddDepartmentMenu;