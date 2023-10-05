import React, {JSX} from 'react';
import cl from "../Calculator.module.css";
import {CSSTransition} from "react-transition-group";

const ChangePeriodTransition = (
    {
        isChangeEffect,
        isGoingRight,
        children
    } : {
        isChangeEffect: boolean,
        isGoingRight:boolean,
        children: JSX.Element
    }
) => {
    return (
        <CSSTransition
            in={isChangeEffect}
            timeout={200}
            classNames={
                isGoingRight
                    ?
                    {
                        enterActive: cl.toNextPeriodStart,
                        exitActive: cl.toNextPeriodEnd
                    }
                    :
                    {
                        enterActive: cl.toPrevPeriodStart,
                        exitActive: cl.toPrevPeriodEnd
                    }
            }
        >
            {children}
        </CSSTransition>
    );
};

export default ChangePeriodTransition;