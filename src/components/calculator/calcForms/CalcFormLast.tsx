import React, {SetStateAction, useEffect, useState} from 'react';
import cl from "../Calculator.module.css";
import FloatingInput from "../../UI/inputs/FloatingInput";
import {IPeriodData} from "../../../models/calculator/IPeriodData";
import {IInfoElement, InputInfoType, lastPeriodInputsArray} from "./FormUtils";

const CalcFormLast = (
    {
        currentPeriodData,
        setCurrentPeriodData,
        lastPeriodInfoArray,
        setLastPeriodInfoArray
    } : {
        currentPeriodData: IPeriodData,
        setCurrentPeriodData: React.Dispatch<SetStateAction<IPeriodData>>,
        lastPeriodInfoArray: IInfoElement[],
        setLastPeriodInfoArray: React.Dispatch<SetStateAction<IInfoElement[]>>
    }) => {

    useEffect(() => {
        setCurrentPeriodData(
            {
                ...currentPeriodData,
                procentFromSales: lastPeriodInfoArray
                    .filter(el => el.type === InputInfoType.SALES)
                    .reduce((a, v) => a = a + v.value, 0),
                tips: lastPeriodInfoArray
                    .filter(el => el.type === InputInfoType.SERVICE)
                    .reduce((a, v) => a = a + v.value, 0),
            }
        )
    }, [lastPeriodInfoArray])

    return (
        <form className={cl.data}>
            {lastPeriodInputsArray.map(calcInput =>
                <FloatingInput label={calcInput.name}
                               type={calcInput.inputType}
                               inputName={calcInput.inputName}
                               onChange={e => setLastPeriodInfoArray(
                                   [
                                       ...lastPeriodInfoArray.filter(el => el.id !== calcInput.id),
                                       {
                                           id: calcInput.id,
                                           type: calcInput.type,
                                           value: Number(e.target.value)
                                       }
                                   ]
                               )}
                               value={lastPeriodInfoArray?.find(val =>
                                   val.id === calcInput.id
                               )?.value}
                />
            )}
        </form>
    );
};

export default CalcFormLast;