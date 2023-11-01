import {IWish} from "../dto/IWish";

export interface ScheduleData {
    weekDates: DayData[];
    rowsData: ScheduleRowData[];
}

export interface DayData {
    date: string;
    day: string;
}

export interface ScheduleRowData {
    employeeId: number;
    employeeName: string;
    wishes: IWish[];
}

export interface preSettingWish {
    name: string;
    startTime: string;
    endTime?: string;
    type: string;
}

export interface ScheduleDayStatus {
    status: string;
    colorScheme: string;
}

export const SCHEDULE_STATUSES: ScheduleDayStatus[] = [
    {
        status: 'DAY_NULL',
        colorScheme: 'gray',
    },
    {
        status: 'DAY_OFF',
        colorScheme: 'purple',
    },
    {
        status: 'DAY_WORK',
        colorScheme: 'cyan',
    },
]