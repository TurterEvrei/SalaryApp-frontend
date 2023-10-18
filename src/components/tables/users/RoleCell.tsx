import React from 'react';
import {Column, Row, Table} from "@tanstack/react-table";
import {IUser} from "../../../models/user/IUser";
import {
    Box,
    Button,
    Grid,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger
} from "@chakra-ui/react";
import CheckboxToggleWithLabel from "../../UI/checkbox/CheckboxToggleWithLabel";
import {Role} from "../../../models/user/Role";
import {ChevronDownIcon} from "@chakra-ui/icons";

const RoleCell = (
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
    const roles: Role[] = getValue();

    //@ts-ignore
    const {updateData} = table.options.meta

    function checkRolesHandler(e: React.ChangeEvent<HTMLInputElement>,
                               role: Role) {
        updateData(row.index, column.id, e.target.checked
            ? [...roles, role]
            : roles.filter(r => r !== role)
        )
    }

    return (
        <Popover isLazy>
            <PopoverTrigger>
                <Button size="sm"
                        colorScheme="primary"
                        rightIcon={<ChevronDownIcon />}
                        letterSpacing={1}
                >
                    {roles.sort()[0]}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody boxShadow="dark-lg">
                    <Grid templateColumns="1fr 1fr"
                          gap={2}
                    >
                        {Object.values(Role).map(role =>
                            <Box justifyContent="center"
                                 key={role}
                            >
                                <CheckboxToggleWithLabel onChange={e =>
                                                             checkRolesHandler(e, role)
                                                         }
                                                         //@ts-ignore
                                                         label={role}
                                                         checked={roles.some(r => r === role)}
                                />
                            </Box>
                        )}
                    </Grid>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default RoleCell;