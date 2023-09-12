import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import $api, {API_URL} from "../http";

export default class AuthService {
    static async login(
        email: string,
        password: string
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('auth/authenticate', {email, password});
    }

    static async registration(
        name: string,
        email: string,
        password: string,
        phoneNumber: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('auth/registration', {name, email, password, phoneNumber});
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>>{
        return axios.post<AuthResponse>(
            `${API_URL}/auth/refresh`,
            {withCredentials: true},
            {headers: {Authorization: `Bearer ${localStorage.getItem('refresh')}`}}
            );
    }

    static async logout(): Promise<void> {
        return $api.post('auth/logout')
    }
}