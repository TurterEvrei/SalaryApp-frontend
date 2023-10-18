import React, {SetStateAction, useEffect, useState} from 'react';
import {IDepartment} from "../../models/dto/IDepartment";
import {IEmployee} from "../../models/dto/IEmployee";
import DepartmentService from "../../services/DepartmentService";
import {
    Box, Button, HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import FloatingInput from "../UI/inputs/FloatingInput";
import AddEmployeeMenu from "../tables/departments/AddEmployeeMenu";
import AddDepartmentMenu from "../tables/employees/AddDepartmentMenu";
import SelectUserMenu from "../tables/employees/SelectUserMenu";
import {IUser} from "../../models/user/IUser";
import EmployeeService from "../../services/EmployeeService";

const defaultEmployee: IEmployee = {
    id: null,
    name: '',
    active: true,
    user: null,
    departments: [],
}

const EmployeeModal = (
    {
        isOpen,
        onClose,
        departments,
        users,
        employee,
        setDepartments,
        setEmployees,
        setUsers,
    }: {
        isOpen: boolean,
        onClose: () => void,
        departments: IDepartment[],
        users: IUser[],
        employee?: IEmployee,
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
        setUsers: React.Dispatch<SetStateAction<IUser[]>>,
    }
) => {

    const [currentEmployee, setCurrentEmployee] = useState<IEmployee>(
        employee ? employee : defaultEmployee
    )

    useEffect(() => {
        setCurrentEmployee(employee ? employee : defaultEmployee)
    }, [])

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setCurrentEmployee({
            ...currentEmployee,
            [e.target.name]: e.target.value
        })
        console.log(currentEmployee)
    }

    function addEmployeeToDepartment(employee: IEmployee, department: IDepartment) {
        setCurrentEmployee({
            ...currentEmployee,
            departments: [
                //@ts-ignore
                ...currentEmployee.departments.filter(id => id !== department.id),
                //@ts-ignore
                department.id
            ]
        })
    }

    function deleteEmployeeFromDepartment(employee: IEmployee, department: IDepartment) {
        setCurrentEmployee({
            ...currentEmployee,
            departments: currentEmployee.departments.filter(id => id !== department.id),
        })
    }

    function isSaveValid(): boolean {
        return !!currentEmployee.name;
    }

    function updateEmployeeUser(value: number | null | undefined) {
        setCurrentEmployee({
            ...currentEmployee,
            user: value ? value : null,
        })
    }

    async function saveEmployee() {
        const result = employee
            ? await EmployeeService.editEmployee(currentEmployee).then(res => res.data)
            : await EmployeeService.createEmployee(currentEmployee).then(res => {
                if (!res.data) return false;
                currentEmployee.id = res.data.id;
                return true;
            })
        if (result) {
            setEmployees(prev =>
                employee
                    ? prev
                        .map(e => (e.user === currentEmployee.user
                            && e.id !== currentEmployee.id)
                            ? {...e, user: null}
                            : e
                        )
                        .map(e => e.id === currentEmployee.id ? currentEmployee : e)
                    : prev.concat(currentEmployee)
            )
            //@ts-ignore
            setDepartments(departments.map(dep =>
                    //@ts-ignore
                    currentEmployee.departments.includes(dep.id)
                        ? {...dep, employees: [...dep.employees, currentEmployee.id]}
                        : {...dep, employees: dep.employees.filter(empId => empId !== currentEmployee.id)}
                )
            )
            setUsers(users.map(u => {
                if (currentEmployee.id === u.employee
                    && currentEmployee.user !== u.id) u.employee = null

                if (currentEmployee.user === u.id
                    && u.employee !== currentEmployee.id) u.employee = currentEmployee.id
                return u;
            }))
        }
        setCurrentEmployee(defaultEmployee);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {employee
                        ? `Работник id: ${employee.id}`
                        : 'Новый работник'
                    }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <VStack spacing={3}>
                        <FloatingInput label='Имя'
                                       type='text'
                                       onChange={inputHandler}
                                       value={currentEmployee.name}
                                       inputName='name'
                        />
                        <Box m={2} textColor='dark.600'>
                            Пользователь
                        </Box>
                        <SelectUserMenu users={users}
                                        updateEmployeeUser={updateEmployeeUser}
                                        currentUser={users.find(u => u.id === currentEmployee.user)}
                        />
                        <Box m={2} textColor='dark.600'>
                            Предприятия
                        </Box>
                        <AddDepartmentMenu departments={departments}
                                           currentEmployee={currentEmployee}
                                           //@ts-ignore
                                           empDeps={departments.filter(d => currentEmployee.departments.includes(d.id))}
                                           addEmployeeToDepartment={addEmployeeToDepartment}
                                           deleteEmployeeFromDepartment={deleteEmployeeFromDepartment}
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button colorScheme="primary"
                            isDisabled={!isSaveValid()}
                            onClick={saveEmployee}
                    >
                        {employee ? 'Сохранить' : 'Создать'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EmployeeModal;