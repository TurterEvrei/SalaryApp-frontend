import {makeAutoObservable} from "mobx";
import {IUserCred} from "../models/user/IUserCred";
import AuthService from "../services/AuthService";
import {IDecodedJwt} from "../models/jwt/IDecodedJwt";
import jwtDecode from "jwt-decode";
import $api from "../http";
import {IUser} from "../models/user/IUser";
import {IDepartment} from "../models/dto/IDepartment";
import {IEmployee} from "../models/dto/IEmployee";
import UserService from "../services/UserService";

export default class Store {

    userCred = {} as IUserCred;
    userProfile = {} as IUser;
    employee = {} as IEmployee;
    departments = [] as IDepartment[];
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }


    setUserCred(value: IUserCred) {
        this.userCred = value;
    }

    setUserProfile(value: IUser) {
        this.userProfile = value;
    }

    setEmployee(value: IEmployee) {
        this.employee = value;
    }

    setDepartments(value: IDepartment[]) {
        this.departments = value;
    }

    setAuth(value: boolean) {
        this.isAuth = value;
    }

    setLoading(value: boolean) {
        this.isLoading = value;
    }

    async login(email: string, password: string) {
        this.setLoading(true)
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('access', response.data.accessToken)
            localStorage.setItem('refresh', response.data.refreshToken)
            this.setAuth(true)
            this.setUserCred(this.getUserCredFromToken(response.data.accessToken))
            console.log(response)
            // await this.fetchUserPrimaryInfo()
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    async registration(
        name: string,
        email: string,
        password: string,
        phoneNumber: string
    ) {
        this.setLoading(true)
        try {
            const response = await AuthService.registration(name, email, password, phoneNumber)
            localStorage.setItem('access', response.data.accessToken)
            localStorage.setItem('refresh', response.data.refreshToken)
            this.setAuth(true)
            this.setUserCred(this.getUserCredFromToken(response.data.accessToken))
            console.log(response)
            // await this.fetchUserPrimaryInfo()
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    async logout() {
        this.setLoading(true)
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            this.setUserCred({} as IUserCred)
            this.setAuth(false)
            console.log(response)
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await AuthService.refresh()
            console.log(response)
            localStorage.setItem('access', response.data.accessToken)
            localStorage.setItem('refresh', response.data.refreshToken)
            this.setAuth(true)
            this.setUserCred(this.getUserCredFromToken(response.data.accessToken))
            // await this.fetchUserPrimaryInfo()
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    private async fetchUserPrimaryInfo() {
        this.setLoading(true)
        try {
            await UserService.fetchProfile()
                .then(res => this.setUserProfile(res.data))
            await UserService.fetchUserEmployee()
                .then(res => this.setEmployee(res.data))
            await UserService.fetchUserDepartments()
                .then(res => this.setDepartments(res.data))
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    async fetchUserProfile() {
        this.setLoading(true)
        try {
            const response = await UserService.fetchProfile()
            console.log(response.data)
            this.setUserProfile(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    async fetchUserEmployee() {
        this.setLoading(true)
        try {
            const response = await UserService.fetchUserEmployee()
            console.log(response.data)
            this.setEmployee(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    async fetchUserDepartments() {
        this.setLoading(true)
        try {
            const response = await UserService.fetchUserDepartments()
            console.log(response.data)
            this.setDepartments(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    private getUserCredFromToken(token: string): IUserCred {
        const decodedToken: IDecodedJwt = jwtDecode(token)
        return {
            id: decodedToken.id,
            email: decodedToken.sub,
            roles: decodedToken.roles,
        }
    }
}