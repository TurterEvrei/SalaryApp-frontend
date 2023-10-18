import $api, {API_URL} from "../http";
import {AxiosResponse} from "axios";
import {IEmployee} from "../models/dto/IEmployee";

export default class EmployeeService {

    static async fetchAllEmployees(): Promise<AxiosResponse<IEmployee[]>> {
        return $api.get<IEmployee[]>(`${API_URL}/admin/employees`)
    }

    static async fetchEmployeesByDepartmentId(departmentId: number): Promise<AxiosResponse<IEmployee[]>> {
        return $api.get<IEmployee[]>(`${API_URL}/master/employees`, {
            params: {
                departmentId: departmentId,
            }
        })
    }

    static async createEmployee(employee: IEmployee): Promise<AxiosResponse<IEmployee>> {
        return $api.post<IEmployee>(`${API_URL}/manager/employee`, employee);
    }

    static async editEmployee(employee: IEmployee): Promise<AxiosResponse<boolean>> {
        return $api.put<boolean>(`${API_URL}/manager/employee`, employee);
    }

    static async editEmployees(employees: IEmployee[]): Promise<AxiosResponse<boolean>> {
        return $api.put<boolean>(`${API_URL}/manager/employees`, employees);
    }

    static async deleteEmployee(id: number): Promise<AxiosResponse<boolean>> {
        return $api.delete(`${API_URL}/manager/employee/${id}`);
    }

}