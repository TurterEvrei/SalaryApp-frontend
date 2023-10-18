import React from 'react';
import {Box} from "@chakra-ui/react";
import DailyReportsTable from "../components/tables/dailyReports/DailyReportsTable";

const ManagementPage = () => {
    return (
        <Box mx={5} py={5}>
            <DailyReportsTable/>
        </Box>
    );
};

export default ManagementPage;