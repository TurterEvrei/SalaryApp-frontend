import {IWish} from "../models/dto/IWish";
import {AxiosResponse} from "axios";
import $api, {API_URL} from "../http";
import {ScheduleData} from "../models/schedule/ScheduleData";
import {PaginationState} from "@tanstack/react-table";

export default class WishService {

    static async getScheduleData(departmentId: number, date: string, pagination: PaginationState): Promise<AxiosResponse<ScheduleData[]>> {
        return $api.get<ScheduleData[]>(`${API_URL}/wishes`, {
            params: {
                departmentId,
                date,
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            }
        })
    }

    static async createWish(wish: IWish): Promise<AxiosResponse<IWish>> {
        return $api.post<IWish>(`${API_URL}/wish`, wish);
    }

    static async editWish(wish: IWish): Promise<AxiosResponse<boolean>> {
        return $api.put<boolean>(`${API_URL}/wish`, wish);
    }

    static async deleteWish(id: number): Promise<AxiosResponse<boolean>> {
        return $api.delete<boolean>(`${API_URL}/wish/${id}`);
    }

}