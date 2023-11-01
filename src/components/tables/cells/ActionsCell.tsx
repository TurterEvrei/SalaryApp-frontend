import React from 'react';
import {Center, IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, HamburgerIcon, InfoIcon} from "@chakra-ui/icons";

const ActionsCell = (
    {
        currentEntity,
        onInfoEntity,
        deleteEntity,
    }: {
        currentEntity: any,
        onInfoEntity: () => void,
        deleteEntity: (id: number) => void,
    }
) => {
    return (
        <Center>
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon />}
                    variant="outline"
                    size="sm"

                />
                <MenuList letterSpacing={1}>
                    <MenuItem icon={<InfoIcon />}
                              onClick={onInfoEntity}
                    >
                        Подробнее
                    </MenuItem>
                    <MenuItem icon={<DeleteIcon />}
                        //@ts-ignore
                              onClick={e => deleteEntity(currentEntity.id)}
                    >
                        Удалить
                    </MenuItem>
                </MenuList>
            </Menu>
        </Center>
    );
};

export default ActionsCell;