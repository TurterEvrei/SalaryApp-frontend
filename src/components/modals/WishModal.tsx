import React, {SetStateAction, useEffect, useState} from 'react';
import {IDepartment} from "../../models/dto/IDepartment";
import {IEmployee} from "../../models/dto/IEmployee";
import {
    Button,
    Checkbox,
    Grid,
    GridItem,
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
    ModalOverlay, useToast,
    VStack
} from "@chakra-ui/react";
import FloatingInput from "../UI/inputs/FloatingInput";
import {IWish} from "../../models/dto/IWish";
import {convertWishTypeToString, WishType} from "../../models/schedule/WishType";
import {ChevronDownIcon} from "@chakra-ui/icons";
import WishService from "../../services/WishService";
import {ScheduleData} from "../../models/schedule/ScheduleData";
import {errorSaveToast, successSaveToast} from "../toast/Toasts";

const WishModal = (
    {
        isOpen,
        onClose,
        currentDepartment,
        targetEmployee,
        employees,
        wish,
        setGlobalWish,
        setScheduleDataList,
        targetDate,
        setTargetDate,
    }: {
        isOpen: boolean,
        onClose: () => void,
        currentDepartment: IDepartment,
        targetEmployee: IEmployee,
        employees: IEmployee[],
        wish: IWish | null,
        setGlobalWish: React.Dispatch<SetStateAction<IWish | null>>,
        setScheduleDataList: React.Dispatch<SetStateAction<ScheduleData[]>>,
        targetDate: string,
        setTargetDate: React.Dispatch<SetStateAction<string>>,
    }
) => {
    const defaultWish: IWish = {
        id: null,
        type: WishType.DAY_OFF,
        dateTime: new Date(),
        endTime: null,
        //@ts-ignore
        employee: targetEmployee.id,
        //@ts-ignore
        department: currentDepartment.id,
        fixed: false,
    }

    const [currentEmployee, setCurrentEmployee] = useState<IEmployee>(targetEmployee)
    const [currentWish, setCurrentWish] = useState<IWish>(defaultWish)
    const toast = useToast()

    useEffect(() => {
        setCurrentEmployee(employees.find(e => e.id === wish?.employee) || targetEmployee)
        if (wish) {
            setCurrentWish({
                ...wish,
                //@ts-ignore
                type: WishType[wish.type],
            })
        } else if (targetDate.length) {
            setCurrentWish({
                ...defaultWish,
                dateTime: new Date(targetDate),
            })
        }
    }, [wish, targetEmployee, currentDepartment, targetDate])

    function getDateTimeValue(): string {
        try {
            //@ts-ignore
            // return currentWish.dateTime?.toISOString().substring(0, 16);
            var d = new Date(currentWish.dateTime)
            return (new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()).substring(0, 16)
        } catch (e) {
            console.log(e)
            return '';
        }
    }

    function onCloseModal() {
        onClose()
        setTargetDate('')
        setCurrentEmployee(targetEmployee)
        // setCurrentWish(targetDate.length
        //     ? {...defaultWish, dateTime: new Date(targetDate)}
        //     : defaultWish)
        setCurrentWish(defaultWish)
        setGlobalWish(null)
    }

    function isSaveValid(): boolean {
        return !!currentWish.dateTime;
    }

    async function saveWish() {
        const wishToSave: IWish = {
            ...currentWish,
            // @ts-ignore
            employee: currentEmployee.id,
            // @ts-ignore
            department: currentDepartment.id,
            // @ts-ignore
            dateTime: getDateTimeValue(),
            // @ts-ignore
            type: convertWishTypeToString(currentWish.type),
        }
        if (new Date(wishToSave.dateTime).getTime() - new Date().getTime() > 1000*3600*24*14) {
            toast({
                title: 'Я все вижу...',
                description: 'За 2 недели пожелания ставят только шлюхи и пидорасы.',
                status: 'info',
                duration: 9000,
                isClosable: true,
            })
        }
        try {
            const result: boolean = wish
                ? await WishService.editWish(wishToSave).then(res => {
                    if (res.data) {
                        commitSaveWish(wishToSave);
                        return true;
                    }
                    return false;
                })
                : await WishService.createWish(wishToSave).then(res => {
                    if (res.data) {
                        commitSaveWish(res.data)
                        return true;
                    }
                    return false;
                })
            if (result) {
                setCurrentWish(defaultWish)
                onCloseModal()
                successSaveToast(toast)
            } else {
                errorSaveToast(toast)
                console.log('Error while saving wish')
            }
        } catch (e) {
            console.log(e)
        }
    }

    function commitSaveWish(wishToSave: IWish) {
        setScheduleDataList(prev =>
            prev.map(scheduleData =>
                scheduleData.weekDates.some(
                    day => day.date === wishToSave.dateTime.toString().substring(0, 10)
                )
                    ? {
                        ...scheduleData,
                        rowsData: scheduleData.rowsData.map(row =>
                            row.employeeId === wishToSave.employee
                                ? {
                                    ...row,
                                    wishes: wishToSave.id
                                        ? [...row.wishes.filter(w => w.id !== wishToSave.id), wishToSave]
                                        : [...row.wishes, wishToSave]
                                }
                                : row
                        )
                    }
                    : scheduleData
            )
        )
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {wish
                        ? `Пожелание id: ${wish.id}`
                        : 'Новое пожелание'
                    }
                </ModalHeader>
                <ModalCloseButton onClick={onCloseModal}/>
                <ModalBody>

                    <VStack spacing={3}>
                        <Grid gridTemplateColumns={'1fr 1fr'}
                              gridTemplateRows={'repeat(3, auto)'}
                              rowGap={2}
                        >
                            <GridItem colSpan={2}>
                                <FloatingInput label='Дата и время'
                                               type='datetime-local'
                                    //@ts-ignore
                                               onChange={e => setCurrentWish({...currentWish, dateTime: new Date(e.target.value)})}
                                    //@ts-ignore
                                               value={getDateTimeValue()}
                                               inputName='dateTime'
                                />
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FloatingInput label='Уход (необязательно)'
                                               type='time'
                                    //@ts-ignore
                                               onChange={e => setCurrentWish({...currentWish, endTime: e.target.value})}
                                    //@ts-ignore
                                               value={currentWish.endTime || null}
                                               inputName='endTime'
                                />
                            </GridItem>
                            <Button colorScheme={currentWish.type === WishType.DAY_OFF ? 'primary' : 'gray'}
                                    borderRightRadius={0}
                                    variant={currentWish.type === WishType.DAY_OFF ? 'solid' : 'outline'}
                                    onClick={() => setCurrentWish({
                                        ...currentWish,
                                        type: WishType.DAY_OFF,
                                    })}
                            >
                                Выходной
                            </Button>
                            <Button colorScheme={currentWish.type === WishType.DAY_WORK ? 'primary' : 'gray'}
                                    borderLeftRadius={0}
                                    variant={currentWish.type === WishType.DAY_WORK ? 'solid' : 'outline'}
                                    onClick={() => setCurrentWish({
                                        ...currentWish,
                                        type: WishType.DAY_WORK,
                                    })}
                            >
                                Рабочий
                            </Button>
                        </Grid>

                        <Menu offset={[0, 0]}>
                            <MenuButton as={Button}
                                        rightIcon={<ChevronDownIcon/>}
                                        isDisabled={!!currentWish.id}
                            >
                                {currentEmployee.name}
                            </MenuButton>
                            <MenuList>
                                {employees.filter(e => (e.id !== currentEmployee.id) && e.active).map(employee =>
                                    <MenuItem onClick={() => setCurrentEmployee(employee)}
                                              key={employee.id}
                                    >
                                        {employee.name}
                                    </MenuItem>
                                )}
                            </MenuList>
                        </Menu>

                        <Checkbox colorScheme={'primary'}
                                  onChange={e => setCurrentWish({...currentWish, fixed: e.target.checked})}
                                  isChecked={currentWish.fixed}
                        >
                            Заблокировать изменения
                        </Checkbox>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onCloseModal}>
                        Закрыть
                    </Button>
                    <Button colorScheme="primary"
                            isDisabled={!isSaveValid()}
                            onClick={saveWish}
                    >
                        {wish ? 'Сохранить' : 'Создать'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default WishModal;