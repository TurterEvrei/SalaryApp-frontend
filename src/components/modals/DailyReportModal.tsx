import React, {SetStateAction, useEffect, useState} from 'react';
import {IDepartment} from "../../models/dto/IDepartment";
import {IEmployee} from "../../models/dto/IEmployee";
import {
    Box,
    Button,
    Flex,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr, useToast,
    VStack
} from "@chakra-ui/react";
import FloatingInput from "../UI/inputs/FloatingInput";
import {IDailyReport} from "../../models/dto/IDailyReport";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {IPayment} from "../../models/dto/IPayment";
import DailyReportService from "../../services/DailyReportService";
import {errorSaveToast, successSaveToast} from "../toast/Toasts";

const DailyReportModal = (
    {
        isOpen,
        onClose,
        currentDepartment,
        employees,
        dailyReport,
        setDailyReports,
        setCurrentGlobalDailyReport,
    }: {
        isOpen: boolean,
        onClose: () => void,
        currentDepartment: IDepartment,
        employees: IEmployee[],
        dailyReport?: IDailyReport,
        setDailyReports: React.Dispatch<SetStateAction<IDailyReport[]>>,
        setCurrentGlobalDailyReport: React.Dispatch<SetStateAction<IDailyReport>>,
    }
) => {
    const defaultDailyReport: IDailyReport = {
        id: null,
        date: new Date().getHours() < 11
            ? new Date(Date.now() - 12*3600*1000)
            : new Date(),
        //@ts-ignore
        department: currentDepartment.id,
        payments: [],
    }

    const [currentDailyReport, setCurrentDailyReport] = useState<IDailyReport>(defaultDailyReport)
    const [paymentToAdd, setPaymentToAdd] = useState<IPayment>({} as IPayment)

    const toast = useToast()

    useEffect(() => {
        setCurrentDailyReport(dailyReport !== undefined
            ? {
                ...dailyReport,
                date: new Date(dailyReport.date)
            }
            : defaultDailyReport)
    }, [dailyReport, currentDepartment])

    function paymentInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value: number = Number(e.target.value)
        setPaymentToAdd({
            ...paymentToAdd,
            [e.target.name]: value,
            totalPayment: value + (e.target.name === 'procentFromSales'
                ? (paymentToAdd.tips || 0)
                : (paymentToAdd.procentFromSales || 0))
        })
    }

    function isAddPaymentValid(): boolean {
        return !!(paymentToAdd.employeeId
            && paymentToAdd.employeeName
            && paymentToAdd.procentFromSales
            && paymentToAdd.tips
            && paymentToAdd.totalPayment)
    }

    function addPaymentToReport() {
        setCurrentDailyReport({
            ...currentDailyReport,
            payments: currentDailyReport.payments.concat(paymentToAdd)
        })
        setPaymentToAdd({} as IPayment)
    }

    function removePaymentFromReport(payment: IPayment) {
        setCurrentDailyReport({
            ...currentDailyReport,
            payments: currentDailyReport.payments.filter(p => p.employeeId !== payment.employeeId)
        })
    }

    function isSaveDailyReportValid(): boolean {
        return !!(
            currentDailyReport.department
            && currentDailyReport.date !== null
            && currentDailyReport.payments.length > 0
        )
    }

    async function saveDailyReport() {
        console.log(currentDailyReport)
        try {
            const result = dailyReport === undefined
                ? await DailyReportService.saveDailyReport(currentDailyReport).then(res => {
                    if (res.data) {
                        setDailyReports(prev =>
                            prev.concat(res.data)
                        )
                        return true;
                    }
                    return false;
                })
                : await DailyReportService.editDailyReport(currentDailyReport).then(res => {
                    if (res.data) {
                        console.log(res.data)
                        setDailyReports(prev => [
                            ...prev.filter(report => report.id !== currentDailyReport.id),
                            res.data
                        ])
                        return true;
                    }
                    return false;
                })

            if (result) {
                onModalClose()
                successSaveToast(toast)
            } else {
                console.log('Error while saving DailyReport')
                errorSaveToast(toast)
            }
        } catch (e) {
            console.log(e)
            errorSaveToast(toast)
        }
    }

    function onModalClose() {
        setCurrentGlobalDailyReport({} as IDailyReport)
        setCurrentDailyReport(defaultDailyReport)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onModalClose} size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {dailyReport
                        ? `Отчет id: ${dailyReport.id}`
                        : 'Новый отчет'
                    }
                </ModalHeader>
                <ModalCloseButton onClick={() => onModalClose()}/>
                <ModalBody>

                    <VStack spacing={3}>
                        <FloatingInput label='Дата отчета'
                                       type='date'
                                       //@ts-ignore
                                       onChange={e => setCurrentDailyReport({...currentDailyReport, date: new Date(e.target.value)})}
                                       //@ts-ignore
                                       value={currentDailyReport.date.toISOString().substring(0, 10)}
                                       inputName='date'
                        />
                        <Box m={2} textColor='dark.600'>
                            Выплаты
                        </Box>
                        <Table variant={'simple'}
                               w={'100%'}
                               mx={1}
                        >
                            <Thead>
                                <Tr>
                                    <Th px={0}>Работник</Th>
                                    <Th px={0}>Процент</Th>
                                    <Th px={0}>Чай</Th>
                                    <Th px={0}>Итог</Th>
                                    <Th px={0}>*</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentDailyReport.payments.map(payment =>
                                <Tr key={payment.employeeId}>
                                    <Td px={0}>
                                        {payment.employeeName}
                                    </Td>
                                    <Td px={0}>
                                        {payment.procentFromSales}
                                    </Td>
                                    <Td px={0}>
                                        {payment.tips}
                                    </Td>
                                    <Td px={0}>
                                        {payment.totalPayment}
                                    </Td>
                                    <Td px={0}>
                                        <Button size="xs"
                                                colorScheme="primary"
                                                justifySelf="flex-end"
                                                onClick={() => removePaymentFromReport(payment)}
                                        >
                                            <MinusIcon/>
                                        </Button>
                                    </Td>
                                </Tr>
                                )}
                            </Tbody>
                        </Table>

                        <Flex alignItems={'center'}
                              w={'100%'}
                              gap={1}
                        >
                            <Menu offset={[0, 0]}>
                                <MenuButton as={Button}
                                            size={'sm'}
                                            minWidth={90}
                                            w={'auto'}
                                            colorScheme={paymentToAdd.employeeName ? 'green' : 'yellow'}
                                >
                                    {paymentToAdd.employeeName || 'Работник'}
                                </MenuButton>
                                <MenuList>
                                    {employees
                                        .filter(e => !currentDailyReport.payments.some(p => p.employeeId === e.id))
                                        .map(employee =>
                                        <MenuItem onClick={() => setPaymentToAdd({
                                            ...paymentToAdd,
                                            //@ts-ignore
                                            employeeId: employee.id,
                                            employeeName: employee.name
                                        })}
                                                  key={employee.id}
                                        >
                                            {employee.name}
                                        </MenuItem>
                                    )}
                                </MenuList>
                            </Menu>
                            <Input variant={'flushed'}
                                   size={'sm'}
                                   w={'auto'}
                                   type={'number'}
                                   placeholder={'Процент'}
                                   name={'procentFromSales'}
                                   onChange={paymentInputHandler}
                                   value={paymentToAdd.procentFromSales || ''}
                            />
                            <Input variant={'flushed'}
                                   size={'sm'}
                                   w={'auto'}
                                   type={'number'}
                                   placeholder={'Чаевые'}
                                   name={'tips'}
                                   onChange={paymentInputHandler}
                                   value={paymentToAdd.tips || ''}
                            />
                            <Input variant={'flushed'}
                                   size={'sm'}
                                   w={'auto'}
                                   type={'number'}
                                   placeholder={'Всего'}
                                   isDisabled
                                   name={'totalPayment'}
                                   value={paymentToAdd.totalPayment || ''}
                            />
                            <Button size="xs"
                                    colorScheme="primary"
                                    justifySelf="flex-end"
                                    onClick={addPaymentToReport}
                                    isDisabled={!isAddPaymentValid()}
                            >
                                <AddIcon/>
                            </Button>
                        </Flex>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={() => onModalClose()}>
                        Закрыть
                    </Button>
                    <Button colorScheme="primary"
                            isDisabled={!isSaveDailyReportValid()}
                            onClick={saveDailyReport}
                    >
                        {dailyReport ? 'Сохранить' : 'Создать'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DailyReportModal;