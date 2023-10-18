import {IPayment} from "./IPayment";

export interface IDailyReport {
    id: number | null;
    payments: IPayment[];
    department: number;
    date: Date;
    dateOfCreated?: Date;
}