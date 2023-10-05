import {IPayment} from "./IPayment";

export interface IDailyReport {
    id: number | null;
    payments: IPayment[];
    department: number;
    date: string;
    dateOfCreated: string;
}