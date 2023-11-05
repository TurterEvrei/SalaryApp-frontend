import React, {SetStateAction} from 'react';
import cl from './FinalResult.module.css'
import {IDailyReport} from "../../../models/dto/IDailyReport";
import FloatingInput from "../../UI/inputs/FloatingInput";
import {IDepartment} from "../../../models/dto/IDepartment";
import DailyReportService from "../../../services/DailyReportService";
import {useToast} from "@chakra-ui/react";
import {errorSaveToast, successSaveToast} from "../../toast/Toasts";
import {useNavigate} from "react-router-dom";

const FinalResult = (
    {
        department,
        dailyReport,
        setDailyReport,
        setShowFinalResult,
    } : {
        department: IDepartment,
        dailyReport: IDailyReport,
        setDailyReport: React.Dispatch<SetStateAction<IDailyReport>>,
        setShowFinalResult: React.Dispatch<SetStateAction<boolean>>,
    }
) => {

    const toast = useToast()
    const navigate = useNavigate()

    var kefFromSettings = department.calcSetting

    var departmentIncome = Math.floor(
        dailyReport.payments
            .reduce((a, v) => a = a + v.procentFromSales, 0) / kefFromSettings +
        dailyReport.payments
            .reduce((a, v) => a = a + v.tips, 0)
    )

    const isSaveValid = (): boolean => {
        return !!(dailyReport.payments && dailyReport.date);
    }

    const saveDailyReport = async () => {
        try {
            const {data} = await DailyReportService.saveDailyReport({
                ...dailyReport,
                //@ts-ignore
                department: department.id
            })
            if (data) {
                successSaveToast(toast)
                navigate('/statistic')
            } else {
                errorSaveToast(toast)
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={cl.resultWrapper}>
            <div className={cl.result}>
                <div className={cl.resultHeader}>
                    Итоги
                </div>
                <div className={cl.tableWrapper}>
                <table className={cl.resultTable}>
                    <thead>
                        <tr>
                            <th>Офик</th>
                            <th>%</th>
                            <th>Чай</th>
                            <th>Общ.</th>
                        </tr>
                    </thead>
                    <tbody>
                    {dailyReport.payments.map((payment, index) =>
                        <tr key={index}>
                            <td>{payment.employeeName}</td>
                            <td>{payment.procentFromSales}</td>
                            <td>{payment.tips}</td>
                            <td>{payment.totalPayment}</td>
                        </tr>
                    )}
                    <tr>
                        <td>{department.name}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{departmentIncome}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <FloatingInput label='Дата'
                               type='date'
                               onChange={e => setDailyReport({
                                   ...dailyReport, date: new Date(e.target.value)
                               })}
                               value={new Date(dailyReport.date).toISOString().substring(0,10)}
                />
                <button className={cl.backBtn}
                        onClick={e => setShowFinalResult(false)}
                >
                    Вернуться
                </button>
                <button className={cl.nextBtn}
                        onClick={saveDailyReport}
                        aria-disabled={!isSaveValid()}
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
};

export default FinalResult;