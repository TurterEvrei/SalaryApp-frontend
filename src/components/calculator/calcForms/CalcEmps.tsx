import React, {SetStateAction, useEffect, useState} from 'react';
import cl from "../Calculator.module.css";
import CheckboxToggle from "../../UI/checkbox/CheckboxToggle";
import {IPeriodData} from "../../../models/calculator/IPeriodData";
import {IEmployee} from "../../../models/dto/IEmployee";
import CheckboxToggleWithLabel from "../../UI/checkbox/CheckboxToggleWithLabel";
import EmployeeService from "../../../services/EmployeeService";
import {IDepartment} from "../../../models/dto/IDepartment";

const CalcEmps = (
    {
        department,
        currentPeriodData,
        setCurrentPeriodData
    } : {
        department: IDepartment,
        currentPeriodData: IPeriodData,
        setCurrentPeriodData: React.Dispatch<SetStateAction<IPeriodData>>
    }) => {

    const [empList, setEmpList] = useState<IEmployee[]>([])

    useEffect(() => {
        //@ts-ignore
        EmployeeService.fetchEmployeesByDepartmentId(department.id)
            .then(result => {
                console.log(result.data)
                setEmpList(result.data)
            })
    }, [department])

    function checkEmpHandler(e: React.ChangeEvent<HTMLInputElement>,
                             emp: IEmployee) {
        e.target.checked ?
            setCurrentPeriodData(
                {...currentPeriodData,
                    employees: [...currentPeriodData.employees, emp]})

            : setCurrentPeriodData(
                {...currentPeriodData,
                    employees: currentPeriodData.employees.filter(
                        storedEmp => storedEmp.id !== emp.id
                    )});
    }

    return (
        <form className={cl.emps}>
            <div>Официанты</div>
            {empList.map((emp) =>
                <CheckboxToggleWithLabel onChange={(e) => checkEmpHandler(e, emp)}
                                         label={emp.name}
                                         checked={currentPeriodData?.employees?.some(obj => obj.id === emp.id)}
                                         key={emp.id}
                />
            )}


        </form>
    );
};

export default CalcEmps;