import React, {SetStateAction} from 'react';
import cl from "../Calculator.module.css";
import FloatingInput from "../../UI/inputs/FloatingInput";
import {IPeriodData} from "../../../models/calculator/IPeriodData";

const CalcFormSimple = (
    {
        currentPeriodData,
        setCurrentPeriodData
    } : {
        currentPeriodData: IPeriodData,
        setCurrentPeriodData: React.Dispatch<SetStateAction<IPeriodData>>
    }) => {

    // function calcFormHandler(e: React.ChangeEvent<HTMLInputElement>) {
    //     setCurrentPeriodData(
    //         // @ts-ignore
    //         {...currentPeriodData,
    //             // @ts-ignore
    //             currentPeriodData[e.target.name] : e.target.value}
    //     )
    // }

    return (
        <form className={cl.data}>
            <FloatingInput name='Продажи'
                           type='number'
                           onChange={(e) =>
                               setCurrentPeriodData(
                                   {...currentPeriodData, procentFromSales: Number(e.target.value)}
                               )}
                           value={currentPeriodData.procentFromSales === -1 ? '' : currentPeriodData.procentFromSales}
                           inputName={'procentFromSales'}
            />
            <FloatingInput name='Сервис'
                           type='number'
                           onChange={(e) =>
                               setCurrentPeriodData(
                                   {...currentPeriodData, tips: Number(e.target.value)}
                               )}
                           value={currentPeriodData.tips === -1 ? '' : currentPeriodData.tips}
                           inputName={'tips'}
            />
        </form>
    );
};

export default CalcFormSimple;