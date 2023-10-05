import React from 'react';
import {Column, Row, Table} from "@tanstack/react-table";
import {IUser} from "../../models/user/IUser";
import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";

interface Status {
    flag: boolean,
    name: string,
    colorScheme: string,
}

const Statuses: Status[] = [
    {
        flag: true,
        name: 'Активен',
        colorScheme: 'green'
    },
    {
        flag: false,
        name: 'Не активен',
        colorScheme: 'yellow'
    }
]

const StatusCell = (
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
    const flag = getValue();

    const currentStatus = Statuses.find((st) => st.flag === flag)
    //@ts-ignore
    const {updateData} = table.options.meta

    return (
        <Menu isLazy
              offset={[0, 0]}
              autoSelect={false}
        >
            <MenuButton as={Button}
                        size="sm"
                        rightIcon={<ChevronDownIcon />}
                        colorScheme={currentStatus?.colorScheme}
                        letterSpacing={1}
            >
                {currentStatus?.name}
            </MenuButton>
            <MenuList>
                {Statuses.map((st, index) =>
                    <MenuItem key={index}
                              onClick={() => updateData(row.index, column.id, st.flag)}

                    >
                        {st.name}
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};

export default StatusCell;