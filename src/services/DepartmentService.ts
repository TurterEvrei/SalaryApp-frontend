import {AxiosResponse} from "axios";
import {IDepartment} from "../models/dto/IDepartment";
import $api, {API_URL} from "../http";

export default class DepartmentService {

    static async fetchAllDepartments(): Promise<AxiosResponse<IDepartment[]>> {
        return $api.get<IDepartment[]>(`${API_URL}/admin/departments`);
    }

    static async createDepartment(department: IDepartment): Promise<AxiosResponse<IDepartment>> {
        return $api.post<IDepartment>(`${API_URL}/admin/department`, department)
    }

    static async editDepartment(department: IDepartment): Promise<AxiosResponse<boolean>> {
        return $api.put<boolean>(`${API_URL}/admin/department`, department);
    }

    static async editDepartments(departments: IDepartment[]): Promise<AxiosResponse<boolean>> {
        return $api.put<boolean>(`${API_URL}/admin/departments`, departments);
    }

    static async deleteDepartment(id: number): Promise<AxiosResponse<Boolean>> {
        return $api.delete(`${API_URL}/admin/department/${id}`)
    }

}