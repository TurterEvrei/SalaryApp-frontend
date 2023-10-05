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

}