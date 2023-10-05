import {IDailyReport} from "../models/dto/IDailyReport";
import {AxiosResponse} from "axios";
import $api, {API_URL} from "../http";

export default class DailyReportService {

    static async saveDailyReport(dailyReport: IDailyReport): Promise<AxiosResponse<IDailyReport>> {
        return $api.post(`${API_URL}/master/dailyReport`, {...dailyReport})
    }

}