export interface IEmployee {
    id: number;
    name: string;
    active: boolean;
    user: number | null;
    departments: number[];
}