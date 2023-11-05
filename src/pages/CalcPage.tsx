import React from 'react';
import Calculator from "../components/calculator/Calculator";
import {observer} from "mobx-react-lite";

const CalcPage = () => {

    return (
        <Calculator
        />
    );
};

export default observer(CalcPage);