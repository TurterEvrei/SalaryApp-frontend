import React from 'react';
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import UserTable from "../tables/UserTable";

const AdminDash = () => {

    return (
        <Box mx={2} py={2}>
            <Tabs isFitted>
                <TabList h={20}>
                    <Tab>Пользователи</Tab>
                    <Tab>Предприятия</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <UserTable/>
                    </TabPanel>
                    <TabPanel>
                        <p>DepartmentsTable!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default AdminDash;