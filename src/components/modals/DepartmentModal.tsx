import React, {SetStateAction, useEffect, useState} from 'react';
import {
    Box,
    Button, HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import {IDepartment} from "../../models/dto/IDepartment";
import FloatingInput from "../UI/inputs/FloatingInput";
import AddEmployeeMenu from "../tables/departments/AddEmployeeMenu";
import {IEmployee} from "../../models/dto/IEmployee";
import DepartmentService from "../../services/DepartmentService";
import {AxiosResponse} from "axios";

const defaultDepartment: IDepartment = {
    name: '',
    employees: [],
    calcSetting: 0,
}

const DepartmentModal = (
    {
        isOpen,
        onClose,
        department,
        employees,
        setDepartments,
        setEmployees,
    }: {
        isOpen: boolean,
        onClose: () => void,
        department?: IDepartment,
        employees: IEmployee[],
        setDepartments: React.Dispatch<SetStateAction<IDepartment[]>>,
        setEmployees: React.Dispatch<SetStateAction<IEmployee[]>>,
    }
) => {

    const [currentDepartment, setCurrentDepartment] = useState<IDepartment>(
        department ? department : defaultDepartment
    )

    useEffect(() => {
        setCurrentDepartment(department ? department : defaultDepartment)
    }, [department])

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setCurrentDepartment({
            ...currentDepartment,
            [e.target.name]: e.target.name === 'calcSetting'
                ? Number(e.target.value)
                : e.target.value
        })
    }

    function addEmployeeToDepartment(employee: IEmployee, department: IDepartment) {
        setCurrentDepartment({
            ...currentDepartment,
            employees: [
                // @ts-ignore
                ...currentDepartment.employees.filter(id => id !== employee.id),
                // @ts-ignore
                employee.id
            ]
        })
    }

    function deleteEmployeeFromDepartment(employee: IEmployee, department: IDepartment) {
        setCurrentDepartment({
            ...currentDepartment,
            employees: currentDepartment.employees.filter(id => id !== employee.id),
        })
    }

    function isSaveValid(): boolean {
        return !!(currentDepartment.name && currentDepartment.calcSetting && currentDepartment.employees);
    }

    async function saveDepartment() {
        const result = department
            ? await DepartmentService.editDepartment(currentDepartment).then(res => res.data)
            : await DepartmentService.createDepartment(currentDepartment).then(async res => {
                if (!res.data) return false;
                currentDepartment.id = res.data.id
                return true;
            })
        if (result) {
            // @ts-ignore
            setEmployees(employees.map(emp =>
                // @ts-ignore
                currentDepartment.employees.includes(emp.id)
                    ? {...emp, departments: [...emp.departments, currentDepartment.id]}
                    : {...emp, departments: emp.departments.filter(depId => depId !== currentDepartment.id)}
            ))
            setDepartments(prev =>
                department
                    ? prev.map(dep => dep.id === currentDepartment.id ? currentDepartment : dep)
                    : [
                    ...prev,
                    currentDepartment
                ]
            )
        } else {
            console.log('Error while saving department')
        }
        setCurrentDepartment(defaultDepartment)
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {department
                        ? `Предприятие id: ${department.id}`
                        : 'Новое предприятие'
                    }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <VStack spacing={3}>
                        <FloatingInput label='Название'
                                       type='text'
                                       onChange={inputHandler}
                                       value={currentDepartment.name}
                                       inputName='name'
                        />
                        <FloatingInput label='Коэф.'
                                       type='number'
                                       onChange={inputHandler}
                                       value={currentDepartment.calcSetting}
                                       inputName='calcSetting'
                        />
                        <Box m={2} textColor='dark.600'>
                            Работники
                        </Box>
                        <HStack>
                            <AddEmployeeMenu depEmployees={employees.filter(e =>
                                             // @ts-ignore
                                                currentDepartment.employees.includes(e.id)
                                             )}
                                             employees={employees}
                                             currentDepartment={currentDepartment}
                                             deleteEmployeeFromDepartment={deleteEmployeeFromDepartment}
                                             addEmployeeToDepartment={addEmployeeToDepartment}
                            />
                        </HStack>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button colorScheme="primary"
                            isDisabled={!isSaveValid()}
                            onClick={saveDepartment}
                    >
                        {department ? 'Сохранить' : 'Создать'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DepartmentModal;