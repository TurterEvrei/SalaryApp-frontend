import React, {useState} from 'react';
import {
    Button, Grid,
    Input,
    InputGroup,
    InputLeftElement, Menu,
    MenuButton,
    MenuDivider, MenuItem,
    MenuList,
    MenuOptionGroup
} from "@chakra-ui/react";
import {ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import {IUser} from "../../../models/user/IUser";

const SelectUserMenu = (
    {
        currentUser,
        users,
        updateEmployeeUser,
    }: {
        currentUser?: IUser,
        users: IUser[],
        updateEmployeeUser: (value: number | null | undefined) => void,
    }
) => {

    const [filterName, setFilterName] = useState<string>('')

    return (
        <Menu isLazy
              offset={[0, 0]}>
            <MenuButton as={Button}
                        size="sm"
                        letterSpacing={1}
                        rightIcon={<ChevronDownIcon />}
                        colorScheme={currentUser ? 'green' : 'yellow'}>
                {currentUser?.name || "Нет"}
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
                    <MenuItem onClick={() => updateEmployeeUser(null)}
                    >
                        Нет
                    </MenuItem>
                    {users.filter(user => !user.employee && user.name.toLowerCase().includes(filterName.toLowerCase())).map(u =>
                        <MenuItem onClick={() => updateEmployeeUser(u.id)}
                                  key={u.id}
                        >
                            {u.name}
                        </MenuItem>
                    )}
                </Grid>
            </MenuList>
        </Menu>
    );
};

export default SelectUserMenu;