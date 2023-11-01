import React from 'react';
import {Box} from "@chakra-ui/react";
import Schedule from "../components/schedule/Schedule";

const SchedulePage = () => {
    return (
        <Box mx={5} py={5} h={'100%'}>
            <Schedule/>
        </Box>
    );
};

export default SchedulePage;