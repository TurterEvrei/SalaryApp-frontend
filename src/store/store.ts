import {makeAutoObservable} from "mobx";
import {IUserCred} from "../models/user/IUserCred";
import AuthService from "../services/AuthService";
import {IDecodedJwt} from "../models/jwt/IDecodedJwt";
import jwtDecode from "jwt-decode";
import $api from "../http";

export default class Store {

    userCred = {} as IUserCred;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }


    setUserCred(value: IUserCred) {
        this.userCred = value;
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
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    private getUserCredFromToken(token: string): IUserCred {
        const decodedToken: IDecodedJwt = jwtDecode(token)
        return {
            email: decodedToken.sub,
            roles: decodedToken.roles,
        }
    }
}