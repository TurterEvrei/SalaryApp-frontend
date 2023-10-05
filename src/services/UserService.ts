import {AxiosResponse} from "axios";
import {IUser} from "../models/user/IUser";
import $api, {API_URL} from "../http";
import {IEmployee} from "../models/dto/IEmployee";
import {IDepartment} from "../models/dto/IDepartment";

export default class UserService {

    static async fetchProfile(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`${API_URL}/profile`);
    }

    static async fetchUserEmployee(): Promise<AxiosResponse<IEmployee>> {
        return $api.get<IEmployee>(`${API_URL}/employee`)
    }

    static async fetchUserDepartments(): Promise<AxiosResponse<IDepartment[]>> {
        return $api.get<IDepartment[]>(`${API_URL}/departments`)
    }

    static async fetchAllUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>(`${API_URL}/admin/users`)
    }

    static async editUser(user: IUser): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>(`${API_URL}/admin/users`, {...user})
    }

}