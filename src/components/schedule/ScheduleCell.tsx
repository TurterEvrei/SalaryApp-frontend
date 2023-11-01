import React from 'react';
import {Box} from "@chakra-ui/react";

const ScheduleCell = (
    {
        children,
    }: {
        children: JSX.Element | string,
    }
) => {
    return (
        <Box border={'1px'}
             borderColor={'dark.400'}
             textAlign={'center'}
             justifyItems={'center'}
        >
            {children}
        </Box>
    );
};

export default ScheduleCell;