import {WishType} from "../schedule/WishType";

export interface IWish {
    id: number | null;
    type: WishType | string;
    dateTime: Date | string;
    endTime: string | null;
    employee: number;
    department: number;
    fixed: boolean;
}