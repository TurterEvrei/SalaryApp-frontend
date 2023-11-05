import React, {useEffect, useState} from 'react';
import cl from './Calculator.module.css'
import CalcFormSimple from "./calcForms/CalcFormSimple";
import {IPeriodData} from "../../models/calculator/IPeriodData";
import CalcEmps from "./calcForms/CalcEmps";
import CalcFormLast from "./calcForms/CalcFormLast";
import ChangePeriodTransition from "./transitions/ChangePeriodTransition";
import {IInfoElement} from "./calcForms/FormUtils";
import {IDailyReport} from "../../models/dto/IDailyReport";
import {IPayment} from "../../models/dto/IPayment";
import FinalResult from "./finalResult/FinalResult";
import SwitchForms from "./transitions/SwitchForms";
import {IDepartment} from "../../models/dto/IDepartment";
import NoDepartment from "./exeptions/NoDepartment";
import {observer} from "mobx-react-lite";
import SwitchDepartment from "./calcForms/SwitchDepartment";
import UserService from "../../services/UserService";
import Loader from "../UI/loader/Loader";

const Calculator = () => {
    const [isShowSwitchingDepartments, setShowSwitchingDepartments] = useState<boolean>(true)
    const [isShowLastPeriodForm, setShowLastPeriodForm] = useState<boolean>(false)
    const [isShowFinalResult, setShowFinalResult] = useState<boolean>(false)
    const [isChangeEffect, setChangeEffect] = useState<boolean>(false)
    const [isGoingRight, setGoingRight] = useState<boolean>(true)

    const [departments, setDepartments] = useState<IDepartment[]>([])
    const [department, setDepartment] = useState<IDepartment>({} as IDepartment)
    const [currentPeriod, setCurrentPeriod] = useState<IPeriodData>({} as IPeriodData)
    const [currentPeriodIndex, setCurrentPeriodIndex] = useState<number>(0)
    const [lastPeriodIndex, setLastPeriodIndex] = useState<number>(-1)
    const [lastPeriodInfoArray, setLastPeriodInfoArray] = useState<IInfoElement[]>([])

    const [periods, setPeriods] = useState<IPeriodData[]>([{
            procentFromSales: -1,
            tips: -1,
            employees: []
        }])

    const [dailyReport, setDailyReport] = useState<IDailyReport>({
        date: new Date().getHours() < 11
            ? new Date(Date.now() - 12*3600*1000)
            : new Date(),
    } as IDailyReport)
    const [isLoading, setLoading] = useState<boolean>(true)
    const kefFromSettings = department.calcSetting

    async function loadDepartments() {
        const {data} = await UserService.fetchUserDepartments()
        if (data?.length === 1) {
            setDepartment(data[0])
            setShowSwitchingDepartments(false)
        }
        setDepartments(data)
    }
    
    useEffect(() => {
        loadDepartments().then(() => setLoading(false))
    }, [])

    useEffect(
        () => {
            setCurrentPeriod(periods[currentPeriodIndex])
        },
        [currentPeriodIndex,periods]
    )

    useEffect(
        () => {
            setChangeEffect(true)
            setTimeout(() => setChangeEffect(false), 200)},
        [currentPeriodIndex]
    )

    useEffect(
        () => {
            if (lastPeriodIndex !== -1) {
                setPeriods(periods.filter((el, index) => index <= lastPeriodIndex))
            }
        },
        [lastPeriodIndex]
    )

    const isPrevPeriodExist = (): boolean => {
        return currentPeriodIndex > 0;
    }

    const isNextPeriodExist = (): boolean => {
        return currentPeriodIndex + 1 < periods.length;
    }

    const isLastPeriod = (): boolean => {
        return currentPeriodIndex === lastPeriodIndex;
    }

    const isLastPeriodPossible = (): boolean => {
        return isLastPeriod() || lastPeriodIndex === -1;
    }

    const isNextPeriodLast = (): boolean => {
        return currentPeriodIndex + 1 === lastPeriodIndex;
    }

    const isChangePeriodValid = (): boolean => {
        return currentPeriod.employees
            && currentPeriod.employees.length > 0
            && currentPeriod.procentFromSales >= 0
            && currentPeriod.tips >=0;
    }

    const nextPeriod = () => {
        setGoingRight(true)

        periods[currentPeriodIndex] = currentPeriod
        !isNextPeriodExist()
            ?
            setPeriods([...periods, {
                procentFromSales: -1,
                tips: -1,
                employees: currentPeriod.employees
            }])
            :
            setPeriods(periods);
        setShowLastPeriodForm(isNextPeriodLast())
        setCurrentPeriodIndex(currentPeriodIndex + 1)
    }

    const prevPeriod = () => {
        setGoingRight(false)

        periods[currentPeriodIndex] = currentPeriod
        setPeriods(periods)
        setCurrentPeriodIndex(currentPeriodIndex - 1)
        setShowLastPeriodForm(false)
    }

    const showLastPeriodForm = () => {
        setShowLastPeriodForm(true)
        setLastPeriodIndex(currentPeriodIndex)
    }

    const hideLastPeriodForm = () => {
        setShowLastPeriodForm(false)
        setLastPeriodIndex(-1)
    }

    const calcPayments = () => {
        periods[currentPeriodIndex] = currentPeriod
        setPeriods(periods)

        var paymentsArr: IPayment[] = [];

        for (var i = 0; i + 1 <= periods.length; i++) {
            const prevPer = periods[i-1];
            const curPer = periods[i];
            var proc: number;
            var tips: number;

            if (prevPer) {
                proc = Math.floor((curPer.procentFromSales - prevPer.procentFromSales) * kefFromSettings / curPer.employees.length)
                tips = Math.floor((curPer.tips - prevPer.tips) / curPer.employees.length)
            } else {
                proc = Math.floor(curPer.procentFromSales * kefFromSettings / curPer.employees.length)
                tips = Math.floor(curPer.tips / curPer.employees.length)
            }
            curPer.employees.forEach(emp => {
                    const savedPayment = paymentsArr.find(el => el.employeeId === emp.id)
                    if (savedPayment) {
                        savedPayment.procentFromSales += proc
                        savedPayment.tips += tips
                        savedPayment.totalPayment += proc + tips
                    } else {
                        paymentsArr.push({
                            employeeId: emp.id,
                            employeeName: emp.name,
                            procentFromSales: proc,
                            tips: tips,
                            totalPayment: proc + tips,
                        } as IPayment)
                    }
            })
        }
        setDailyReport({...dailyReport, payments: paymentsArr})
        setShowFinalResult(true)
    }

    if (isLoading) return <Loader/>;

    if (!departments?.length) {
        return (
            <NoDepartment/>
        )
    }

    return (
        <div className={cl.container}>
            <div>
                {/*<span className={cl.pageDescription}>Расчет зарплаты сотрудников</span>*/}
                {/*<span className={cl.pageName}>Калькулятор</span>*/}
            </div>
            <SwitchForms isChangeEffect={isShowFinalResult}>
            {isShowFinalResult
                ?
                <FinalResult department={department}
                             dailyReport={dailyReport}
                             setDailyReport={setDailyReport}
                             setShowFinalResult={setShowFinalResult}
                />
                :
                <div className={cl.cardWrapper}>
                    <div className={cl.card}>
                        <SwitchForms isChangeEffect={isShowSwitchingDepartments}>
                            {isShowSwitchingDepartments
                                ?
                                <SwitchDepartment departments={departments}
                                                  setDepartment={setDepartment}
                                                  setShowSwitchingDepartments={setShowSwitchingDepartments}

                                />
                                :
                                <>
                                <div className={cl.rowNext}
                                     onClick={nextPeriod}
                                     aria-disabled={currentPeriodIndex === lastPeriodIndex || !isChangePeriodValid()}
                                >
                                    <i className="bi bi-caret-right-fill"></i>
                                </div>
                                <div className={cl.rowPrev}
                                     onClick={prevPeriod}
                                     aria-disabled={!isPrevPeriodExist() || !isChangePeriodValid()}
                                >
                                    <i className="bi bi-caret-left-fill"></i>
                                </div>
                                <div className={cl.header}>
                                    Период {currentPeriodIndex + 1}/{periods.length}
                                </div>
                                <div className={cl.changeFormRadio}>
                                    <button className={!isShowLastPeriodForm ? cl.active : ''}
                                            onClick={hideLastPeriodForm}
                                    >
                                        Обычный период
                                    </button>
                                    <button className={isShowLastPeriodForm ? cl.active : ''}
                                            onClick={showLastPeriodForm}
                                            aria-disabled={!isLastPeriodPossible()}
                                    >
                                        Финальный период
                                    </button>
                                </div>
                                <SwitchForms isChangeEffect={isShowLastPeriodForm}>
                                            {isShowLastPeriodForm
                                                ?
                                                <CalcFormLast currentPeriodData={currentPeriod}
                                                              setCurrentPeriodData={setCurrentPeriod}
                                                              lastPeriodInfoArray={lastPeriodInfoArray}
                                                              setLastPeriodInfoArray={setLastPeriodInfoArray}
                                                />
                                                :
                                                <ChangePeriodTransition isChangeEffect={isChangeEffect}
                                                                        isGoingRight={isGoingRight}
                                                >
                                                    <CalcFormSimple currentPeriodData={currentPeriod}
                                                                    setCurrentPeriodData={setCurrentPeriod}
                                                    />
                                                </ChangePeriodTransition>
                                            }
                                </SwitchForms>
                                <ChangePeriodTransition isChangeEffect={isChangeEffect}
                                                        isGoingRight={isGoingRight}
                                >
                                    <CalcEmps department={department}
                                              currentPeriodData={currentPeriod}
                                              setCurrentPeriodData={setCurrentPeriod}
                                    />
                                </ChangePeriodTransition>

                                <div className={cl.footer}>
                                    {/*<button onClick={testCheckCurrentPeriod}>back</button>*/}
                                    <button className={cl.active}
                                            // onClick={testCheckCurrentPeriod}
                                            onClick={calcPayments}
                                            aria-disabled={!isShowLastPeriodForm || !isChangePeriodValid()}
                                    >
                                        Завершить
                                    </button>
                                </div>
                                </>
                            }
                         </SwitchForms>

                    </div>
                </div>
            }
            </SwitchForms>
        </div>
    );
};

export default observer(Calculator);