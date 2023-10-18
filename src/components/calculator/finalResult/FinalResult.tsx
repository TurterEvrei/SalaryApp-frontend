import React, {SetStateAction} from 'react';
import cl from './FinalResult.module.css'
import {IDailyReport} from "../../../models/dto/IDailyReport";
import FloatingInput from "../../UI/inputs/FloatingInput";
import {IDepartment} from "../../../models/dto/IDepartment";
import DailyReportService from "../../../services/DailyReportService";

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
        console.log({
            ...dailyReport,
            department: department.id,
        } as IDailyReport)
        const response = await DailyReportService.saveDailyReport({
            ...dailyReport,
            //@ts-ignore
            department: department.id
        })
        console.log(response.data)
    }

    return (
        <div className={cl.resultWrapper}>
            <div className={cl.result}>
                <div className={cl.resultHeader}>
                    Итоги
                </div>
                <table className={cl.resultTable}>
                    <thead>
                        <tr>
                            <th>Официант</th>
                            <th>Процент</th>
                            <th>Чаевые</th>
                            <th>Общее</th>
                        </tr>
                    </thead>
                    <tbody>
                    {dailyReport.payments.map(payment =>
                        <tr>
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
                <FloatingInput label='Дата'
                               type='date'
                               onChange={e => setDailyReport({
                                   ...dailyReport, date: e.target.value as unknown as Date
                               })}
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