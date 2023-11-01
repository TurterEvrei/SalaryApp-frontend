import React from 'react';
import {Box} from "@chakra-ui/react";
import Statistic from "../components/stats/Statistic";

const StatisticPage = () => {
    return (
        <Box mx={5} py={5} h={'100%'}>
            <Statistic/>
        </Box>
    );
};

export default StatisticPage;