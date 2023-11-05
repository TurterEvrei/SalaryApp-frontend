import React from 'react';
import {Td} from "@chakra-ui/react";

const ScheduleCell = (
    {
        children,
    }: {
        children: JSX.Element | string,
    }
) => {
    return (
        <Td border={'1px'}
             borderColor={'dark.400'}
             textAlign={'center'}
             justifyItems={'center'}
            py={0}
            px={0}
        >
            {children}
        </Td>
    );
};

export default ScheduleCell;