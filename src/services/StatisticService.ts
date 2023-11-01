import $api, {API_URL} from "../http";
import {AxiosResponse} from "axios";
import {StatisticData} from "../models/statistic/StatisticData";

export default class StatisticService {

    static async getStatisticDataForUser(
        departmentId: number,
        periodType: string,
        dateStart: string | null,
        dateFinish: string | null,
    ): Promise<AxiosResponse<StatisticData>> {
        return $api.get<StatisticData>(`${API_URL}/statistic`, {
            params: {
                departmentId,
                periodType,
                dateStart,
                dateFinish,
            }
        })
    }

    static async getStatisticDataForMaster(
        departmentId: number,
        periodType: string,
        statType: string,
        dateStart: string | null,
        dateFinish: string | null,
    ): Promise<AxiosResponse<StatisticData>> {
        return $api.get<StatisticData>(`${API_URL}/master/statistic`, {
            params: {
                departmentId,
                periodType,
                statType,
                dateStart,
                dateFinish,
            }
        })
    }

}