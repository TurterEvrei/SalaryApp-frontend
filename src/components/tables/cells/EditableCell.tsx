import React, {useEffect, useState} from 'react';
import {Column, Row, Table} from "@tanstack/react-table";
import {IUser} from "../../../models/user/IUser";
import {Input} from "@chakra-ui/react";

const EditableCell = (
    {
        getValue,
        row,
        column,
        table,
    }: {
        getValue: () => any,
        row: Row<any>,
        column: Column<any>,
        table: Table<any>,
    }
) => {

    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
        //@ts-ignore
        table.options.meta?.updateData(row.index, column.id, value)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <Input
            value={value}
            onChange={e =>
                setValue(e.target.value)
            }
            onBlur={onBlur}
            variant="filled"
            size="sm"
            w="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            bg="transparent"
        />
    );
};

export default EditableCell;