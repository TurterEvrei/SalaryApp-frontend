import React from 'react';
import cl from "./checkboxToggle.module.css";

const CheckboxToggleWithLabel = (
    {
        onChange,
        label,
        checked
    }: {
        onChange: React.ChangeEventHandler<HTMLInputElement>,
        label: string,
        checked?: boolean
    }
) => {
    return (
        <span className={cl.action}>
            <input type="checkbox" onChange={onChange} checked={checked}/>
            <i></i>
            <label className={cl.checkLabel}>{label}</label>
        </span>
    );
};

export default CheckboxToggleWithLabel;