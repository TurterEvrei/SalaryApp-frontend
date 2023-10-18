import React, {SetStateAction, useState} from 'react';
import {Column, Row, Table} from "@tanstack/react-table";
import {IUser} from "../../../models/user/IUser";
import {IEmployee} from "../../../models/dto/IEmployee";
import {
    Button, Grid,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton, MenuDivider, MenuItem,
    MenuList,
    MenuOptionGroup
} from "@chakra-ui/react";
import {ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import SelectUserMenu from "./SelectUserMenu";

const UserCell = (
    {
        getValue,
        row,
        column,
        table,
        users,
        setUsers,
    }: {
        getValue: () => any,
        row: Row<IEmployee>,
        column: Column<IEmployee>,
        table: Table<IEmployee>,
        users: IUser[],
        setUsers: React.Dispatch<SetStateAction<IUser[]>>,
    }
) => {

    const currentUser = users.find(user => user.id === getValue())
    //@ts-ignore
    const {updateData} = table.options.meta

    function updateEmployeeUser(value: number | null | undefined) {
        try {
            updateData(row.index, column.id, value)

            setUsers(
                // @ts-ignore
                value
                    ?
                    users.map(user =>
                        user.id === value ? {...user, employee: row.getValue('id')} : user
                    ).map(user => user.id === currentUser?.id ? {...user, employee: null} : user)
                    :
                    users.map(u =>
                        u.id === currentUser?.id ? {...u, employee: null} : u
                    )
            )
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <SelectUserMenu users={users}
                        currentUser={currentUser}
                        updateEmployeeUser={updateEmployeeUser}
        />
    );
};

export default UserCell;