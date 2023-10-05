import React from 'react';
import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";
import {Column, Row, Table} from "@tanstack/react-table";
import {IUser} from "../../models/user/IUser";
import UserService from "../../services/UserService";
import editableCell from "./EditableCell";

const ActionsCell = (
    {
        getValue,
        row,
        column,
        table,
    }: {
        getValue: () => any,
        row: Row<IUser>,
        column: Column<IUser>,
        table: Table<IUser>,
    }
) => {
    const currentUser: IUser = row.original

    async function editUser(user: IUser) {
        const response = await UserService.editUser(user)
        console.log(response.data)
        console.log(currentUser)

    }

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                size="sm"
            />
            <MenuList letterSpacing={1}>
                <MenuItem icon={<EditIcon />}
                          onClick={e => editUser(currentUser)}
                >
                    Сохранить изменения
                </MenuItem>
                <MenuItem icon={<DeleteIcon />}>
                    Удалить
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ActionsCell;