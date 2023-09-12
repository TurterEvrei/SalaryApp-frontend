import axios from "axios";
import AuthService from "../services/AuthService";

export const API_URL = 'http://localhost:8080/api/v1'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (localStorage.getItem('access') != null && localStorage.getItem('access') !== 'undefined') {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
    }
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    console.log('Intersept response')
    if ((error.response.status === 401) && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await AuthService.refresh();
            console.log(response)
            localStorage.setItem('access', response.data.accessToken)
            localStorage.setItem('refresh', response.data.refreshToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw error;
})

export default $api