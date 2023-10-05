import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {IDepartment} from "../models/dto/IDepartment";
import NoDepartment from "../components/calculator/exeptions/NoDepartment";
import Calculator from "../components/calculator/Calculator";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import UserService from "../services/UserService";
import {useAsyncValue, useLoaderData} from "react-router-dom";

const CalcPage = () => {

    // const {store} = useContext(Context)
    // const departments: IDepartment[] = toJS(store.departments)

    // store.setDepartments(departments)

    // useEffect(() => {
    //     if (departments.length === 1) {
    //         setDepartment(departments[0])
    //         console.log(departments[0])
    //     }
    //     else {
    //         setShowSwitchingDepartments(true)
    //     }
    // }, [])

    // if (!departments?.length) {
    //     return (
    //         <NoDepartment/>
    //     )
    // }

    // if (department) {
    //     setShowSwitchingDepartments(false)
    // }

    return (
        <Calculator
            // isShowSwitchingDepartments={isShowSwitchingDepartments}
                    // department={department}
                    // setDepartment={setDepartment}
        />
        // <div>Calculator</div>
    );
};

// async function getDepartments() {
//     return await UserService.fetchUserDepartments();
// }
//
// export const calcInfoLoader = async () => {
//     return {
//         departments: await getDepartments(),
//     }
// }

export default observer(CalcPage);