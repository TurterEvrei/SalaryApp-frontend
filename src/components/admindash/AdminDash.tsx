import React, {useEffect, useState} from 'react';
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import UserTable from "../tables/users/UserTable";
import DepartmentTable from "../tables/departments/DepartmentTable";
import {IDepartment} from "../../models/dto/IDepartment";
import {IUser} from "../../models/user/IUser";
import {IEmployee} from "../../models/dto/IEmployee";
import UserService from "../../services/UserService";
import EmployeeService from "../../services/EmployeeService";
import DepartmentService from "../../services/DepartmentService";
import EmployeesTable from "../tables/employees/EmployeesTable";

const AdminDash = () => {

    const [departments, setDepartments] = useState<IDepartment[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [employees, setEmployees] = useState<IEmployee[]>([])

    useEffect(() => {
        getAllUsers().then(() => getAllEmployees())
        getAllDepartments()
    }, [])

    async function getAllUsers() {
        const response = await UserService.fetchAllUsers()
        setUsers(response.data)
        // console.log(response.data)
    }

    async function getAllEmployees() {
        const response = await EmployeeService.fetchAllEmployees()
        setEmployees(response.data)
    }

    async function getAllDepartments() {
        const response = await DepartmentService.fetchAllDepartments()
        setDepartments(response.data)
    }

    return (
        <Box mx={2} py={2}>
            <Tabs isFitted>
                <TabList h={20}>
                    <Tab>Пользователи</Tab>
                    <Tab>Предприятия</Tab>
                    <Tab>Работники</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <UserTable users={users}
                                   setUsers={setUsers}
                                   employees={employees}
                                   setEmployees={setEmployees}
                        />
                    </TabPanel>
                    <TabPanel>
                        <DepartmentTable departments={departments}
                                         setDepartments={setDepartments}
                                         employees={employees}
                                         setEmployees={setEmployees}
                        />
                    </TabPanel>
                    <TabPanel>
                        <EmployeesTable departments={departments}
                                        setDepartments={setDepartments}
                                        employees={employees}
                                        setEmployees={setEmployees}
                                        users={users}
                                        setUsers={setUsers}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default AdminDash;