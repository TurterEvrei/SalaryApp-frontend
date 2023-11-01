import React, {SetStateAction, useContext, useEffect, useState} from 'react';
import {IWish} from "../../models/dto/IWish";
import {Button, Menu, MenuButton, MenuItem, MenuList, useToast} from "@chakra-ui/react";
import {WishType} from "../../models/schedule/WishType";
import {preSettingWish, SCHEDULE_STATUSES, ScheduleData, ScheduleDayStatus} from "../../models/schedule/ScheduleData";
import {IDepartment} from "../../models/dto/IDepartment";
import WishService from "../../services/WishService";
import {DeleteIcon, EditIcon, SunIcon, TimeIcon} from "@chakra-ui/icons";
import {IEmployee} from "../../models/dto/IEmployee";
import {Context} from "../../index";
import {errorDeleteToast, errorSaveToast, successDeleteToast, successSaveToast} from "../toast/Toasts";

const preSettingsWish: preSettingWish[] = [
    {
        name: '11',
        startTime: '11:00:00',
        type: 'DAY_WORK',
    },
    {
        name: '14',
        startTime: '14:00:00',
        type: 'DAY_WORK',
    },
    {
        name: '16',
        startTime: '16:00:00',
        type: 'DAY_WORK',
    },
    {
        name: '18',
        startTime: '18:00:00',
        type: 'DAY_WORK',
    },
    {
        name: '11-16',
        startTime: '11:00:00',
        endTime: '16:00:00',
        type: 'DAY_WORK',
    },
    {
        name: 'Выходной',
        startTime: '11:00:00',
        type: 'DAY_OFF',
    },
]

const ScheduleDay = (
    {
        wish,
        day,
        employeeId,
        currentDepartment,
        setScheduleDataList,
        scheduleDataIndex,
        employees,
        setTargetEmployee,
        setTargetWish,
        onOpen,
        setTargetDate,
    }: {
        wish: IWish | null,
        day: string,
        employeeId: number,
        currentDepartment: IDepartment,
        setScheduleDataList: React.Dispatch<SetStateAction<ScheduleData[]>>,
        scheduleDataIndex: number,
        employees: IEmployee[],
        setTargetEmployee: React.Dispatch<SetStateAction<IEmployee>>,
        setTargetWish: React.Dispatch<SetStateAction<IWish | null>>,
        onOpen: () => any,
        setTargetDate: React.Dispatch<SetStateAction<string>>,
    }
) => {

    const [status, setStatus] = useState<ScheduleDayStatus>(SCHEDULE_STATUSES[0])
    const {store} = useContext(Context)
    const toast = useToast()

    useEffect(() => {
        setStatus(SCHEDULE_STATUSES[
            wish
                ? isDayWork()
                    ? 2
                    : 1
                : 0
            ]
        )
    }, [wish])

    function getHours(dateTime: string | Date | null): string {
        if (dateTime === null) return '-';
        return dateTime.toString().substring(11,13);
    }

    function getEndHours(time: string | null): string {
        if (time === null) return '';
        return `-${time.substring(0, 2)}`;
    }

    function isDayWork(): boolean {
        // @ts-ignore
        return WishType[wish?.type] === WishType.DAY_WORK;
    }

    function isEditBlocked(): boolean {
        return !!(wish?.fixed
            && store.userCred.empId !== employeeId
            && !store.isMaster()
        )
    }

    async function onOpenModal() {
        setTargetDate(day)
        const employeeToSetAsTarget = employees.find(e => e.id === employeeId)
        if (employeeToSetAsTarget) setTargetEmployee(employeeToSetAsTarget);
        setTargetWish(wish);
        onOpen()
    }

    async function saveWish(startTime: string, endTime: string | null, type: string) {
        const wishToSave: IWish = {
            id: wish ? wish.id : null,
            type: type,
            dateTime: `${day}T${startTime}`,
            endTime: endTime,
            employee: employeeId,
            //@ts-ignore
            department: currentDepartment.id,
            fixed: false,
        }
        if (new Date(day).getTime() - new Date().getTime() > 1000*3600*24*14) {
            toast({
                title: 'Я все вижу...',
                description: 'За 2 недели пожелания ставят только шлюхи и пидорасы.',
                status: 'info',
                duration: 9000,
                isClosable: true,
            })
        }
        const result: boolean = wish
            ? await WishService.editWish(wishToSave).then(res => {
                if (res) {
                    commitSaveWishToScheduleData(wishToSave)
                    return true;
                }
                return false;
            })
            : await  WishService.createWish(wishToSave).then(res => {
                if (res.data) {
                    commitSaveWishToScheduleData(res.data)
                }
                return !!res;
            })

        if (result) {
            successSaveToast(toast)
        } else {
            errorSaveToast(toast)
            console.log('Error while saving wish')
        }
    }

    function commitSaveWishToScheduleData(wishToSave: IWish) {
        setScheduleDataList(prev =>
            prev.map((scheduleData, index) =>
                index === scheduleDataIndex
                    ? {
                        ...scheduleData,
                        rowsData: scheduleData.rowsData.map(rowData =>
                            rowData.employeeId === employeeId
                                ? {
                                    ...rowData,
                                    wishes: wish
                                        ? [...rowData.wishes.filter(w => w.id !== wishToSave.id), wishToSave]
                                        : [...rowData.wishes, wishToSave]
                                }
                                : rowData
                        )
                    }
                    : scheduleData
            )
        )
    }

    async function deleteWish() {
        if (wish?.id ) {
            const {data} = await WishService.deleteWish(wish.id)
            if (data) {
                setScheduleDataList(prev =>
                    prev.map((scheduleData, index) =>
                        index === scheduleDataIndex
                            ? {
                                ...scheduleData,
                                rowsData: scheduleData.rowsData.map(rowData =>
                                    rowData.employeeId === employeeId
                                        ? {
                                            ...rowData,
                                            wishes: [...rowData.wishes.filter(w => w.id !== wish.id)]
                                        }
                                        : rowData
                                )
                            }
                            : scheduleData
                    )
                )
                successDeleteToast(toast)
            } else {
                errorDeleteToast(toast)
                console.log(`Error while deleting wish with id: ${wish.id}`)
            }
        } else {
            console.log('Wish id = null');
        }
    }

    return (
        <Menu offset={[0, 0]}>
            <MenuButton as={Button}
                        h={'100%'}
                        w={'100%'}
                        borderRadius={0}
                        colorScheme={status.colorScheme}
                        py={1}
                        isDisabled={isEditBlocked()}
            >
                {wish
                    ? isDayWork()
                        ? getHours(wish?.dateTime || null) + getEndHours(wish?.endTime || null)
                        : 'Вых'
                    : '-'
                }
            </MenuButton>
            <MenuList>
                {preSettingsWish.map((preSetting, index) =>
                    <MenuItem onClick={() => saveWish(
                                  preSetting.startTime,
                                  preSetting.endTime || null,
                                  preSetting.type
                              )}
                              key={index}
                              icon={preSetting.type === 'DAY_WORK' ? <TimeIcon/> : <SunIcon/>}
                    >
                        {preSetting.name}
                    </MenuItem>
                )}
                <MenuItem icon={<EditIcon />}
                          onClick={onOpenModal}
                >
                    Свой вариант
                </MenuItem>
                <MenuItem icon={<DeleteIcon />}
                          onClick={deleteWish}
                          isDisabled={!wish?.id}
                >
                    Очистить
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ScheduleDay;