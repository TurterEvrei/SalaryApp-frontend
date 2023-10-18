import React, {SetStateAction} from 'react';
import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";
import {Column, Row, Table} from "@tanstack/react-table";
import {IUser} from "../../../models/user/IUser";
import UserService from "../../../services/UserService";
import editableCell from "../cells/EditableCell";
import {IEmployee} from "../../../models/dto/IEmployee";

const ActionsUserCell = (
    {
        getValue,
        row,
        column,
        table,
        setUsers,
        setEmployees,
    }: {
        getValue: () => any,
        row: Row<IUser>,
        column: Column<IUser>,
        table: Table<IUser>,
        setUsers: React.Dispatch<SetStateAction<IUser[]>>,
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
    }
) => {
    const currentUser: IUser = row.original

    async function editUser(user: IUser) {
        const response = await UserService.editUser(user)
        console.log(response.data)
    }

    async function deleteUser(id: number) {
        const response = await UserService.deleteUser(id)
        console.log(response.data)
        if (response.data) {
            setEmployees(prev => prev.map(e => e.user === currentUser.id ? {...e, user: null} : e))
            setUsers(prev => prev.filter(u => u.id !== id))
        }
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
                <MenuItem icon={<DeleteIcon />}
                          //@ts-ignore
                          onClick={e => deleteUser(currentUser.id)}
                >
                    Удалить
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ActionsUserCell;