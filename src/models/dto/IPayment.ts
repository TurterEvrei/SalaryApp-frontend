export interface IPayment {
    id?: number;
    procentFromSales: number;
    tips: number;
    totalPayment: number;
    employeeId: number;
    employeeName: string;
    date?: Date;
}