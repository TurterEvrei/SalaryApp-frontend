import React, {JSX} from 'react';
import cl from "../Calculator.module.css";
import {SwitchTransition, CSSTransition} from "react-transition-group";

const SwitchForms = (
    {
        isChangeEffect,
        children
    } : {
        isChangeEffect: boolean,
        children: JSX.Element
    }
) => {
    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition
                // @ts-ignore

                key={isChangeEffect}
                timeout={200}
                classNames={{
                    enterActive: cl.formEntering,
                    exitActive: cl.formExiting
                }}
            >
                {children}
            </CSSTransition>
        </SwitchTransition>
    );
};

export default SwitchForms;