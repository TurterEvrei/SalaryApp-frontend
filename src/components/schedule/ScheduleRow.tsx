import React, {SetStateAction} from 'react';
import {Center, Grid} from "@chakra-ui/react";
import {DayData, ScheduleData, ScheduleRowData} from "../../models/schedule/ScheduleData";
import ScheduleCell from "./ScheduleCell";
import ScheduleDay from "./ScheduleDay";
import {IDepartment} from "../../models/dto/IDepartment";
import {IEmployee} from "../../models/dto/IEmployee";
import {IWish} from "../../models/dto/IWish";

const ScheduleRow = (
    {
        row,
        weekDates,
        currentDepartment,
        setScheduleDataList,
        scheduleDataIndex,
        employees,
        setTargetEmployee,
        onOpen,
        setTargetWish,
        setTargetDate,
    }: {
        row: ScheduleRowData,
        weekDates: DayData[],
        currentDepartment: IDepartment,
        setScheduleDataList: React.Dispatch<SetStateAction<ScheduleData[]>>,
        scheduleDataIndex: number,
        employees: IEmployee[],
        setTargetEmployee: React.Dispatch<SetStateAction<IEmployee>>,
        onOpen: () => any,
        setTargetWish: React.Dispatch<SetStateAction<IWish |  null>>,
        setTargetDate: React.Dispatch<SetStateAction<string>>,
    }
) => {

    return (
        <Grid gridTemplateColumns={'80px repeat(7, 1fr)'}
              w={'100%'}
        >
            <ScheduleCell>
                <Center h={'100%'}>
                    {row.employeeName}
                </Center>
            </ScheduleCell>
            {weekDates.map(day =>
                <ScheduleCell key={day.date}>
                    <ScheduleDay wish={row.wishes.find(w =>
                                     w.dateTime.toString().substring(0, 10) === day.date
                                 ) || null}
                                 day={day.date}
                                 employeeId={row.employeeId}
                                 currentDepartment={currentDepartment}
                                 setScheduleDataList={setScheduleDataList}
                                 scheduleDataIndex={scheduleDataIndex}
                                 employees={employees}
                                 setTargetEmployee={setTargetEmployee}
                                 onOpen={onOpen}
                                 setTargetWish={setTargetWish}
                                 key={day.date}
                                 setTargetDate={setTargetDate}
                    />
                </ScheduleCell>
            )}

        </Grid>
    );
};

export default ScheduleRow;