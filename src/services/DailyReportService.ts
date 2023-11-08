import {IDailyReport} from "../models/dto/IDailyReport";
import {AxiosResponse} from "axios";
import $api, {API_URL} from "../http";

export default class DailyReportService {

    static async fetchDailyReports(
        departmentId: number,
        datePeriodType: string,
        dateStart: string | null,
        dateFinish: string | null,
    ): Promise<AxiosResponse<IDailyReport[]>> {
        return $api.get<IDailyReport[]>(`${API_URL}/master/dailyReports`, {
            params: {
                departmentId,
                datePeriodType: datePeriodType,
                dateStart,
                dateFinish,
            }
        });
    }

    static async saveDailyReport(dailyReport: IDailyReport): Promise<AxiosResponse<IDailyReport>> {
        return $api.post<IDailyReport>(`${API_URL}/master/dailyReport`, {...dailyReport});
    }

    static async editDailyReport(dailyReport: IDailyReport): Promise<AxiosResponse<IDailyReport>> {
        return $api.put<IDailyReport>(`${API_URL}/master/dailyReport`, dailyReport);
    }

    static async deleteDailyReport(id: number): Promise<AxiosResponse<boolean>> {
        return $api.delete(`${API_URL}/master/dailyReport/${id}`);
    }

    static async exportReportsTable(
        departmentId: number,
        datePeriodType: string,
        dateStart: string | null,
        dateFinish: string | null,
    ) {
        return $api.get(`${API_URL}/master/reports-table`, {
            responseType: 'blob',
            params: {
                departmentId,
                datePeriodType: datePeriodType,
                dateStart,
                dateFinish,
            },
        });
    }

}