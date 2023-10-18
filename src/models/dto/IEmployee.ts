export interface IEmployee {
    id: number | null;
    name: string;
    active: boolean;
    user: number | null;
    departments: number[];
}