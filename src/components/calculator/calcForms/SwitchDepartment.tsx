import React, {SetStateAction, useContext, useState} from 'react';
import cl from "../Calculator.module.css";
import {IDepartment} from "../../../models/dto/IDepartment";
import {Context} from "../../../index";
import {toJS} from "mobx";

const SwitchDepartment = (
    {
        departments,
        setDepartment,
        setShowSwitchingDepartments,
    }: {
        departments: IDepartment[],
        setDepartment: React.Dispatch<SetStateAction<IDepartment>>,
        setShowSwitchingDepartments: React.Dispatch<SetStateAction<boolean>>
    }
) => {
    return (
        <>
            <div className={cl.header}>
                Предприятия
            </div>
            <div className={cl.data}>
                {
                    departments.map(dep =>
                    <button className={cl.choiceBtn}
                            onClick={() => {
                                setDepartment(dep)
                                setShowSwitchingDepartments(false)
                            }}
                    >
                        {dep.name}
                    </button>
                )}
            </div>
        </>
    );
};

export default SwitchDepartment;