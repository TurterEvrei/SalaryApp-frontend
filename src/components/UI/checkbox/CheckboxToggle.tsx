import React from 'react';
import cl from './checkboxToggle.module.css'

const CheckboxToggle = (
    {
        onChange,
        checked
    }: {
        onChange: React.ChangeEventHandler<HTMLInputElement>,
        checked?: boolean
    }
) => {
    return (
        <span className={cl.action}>
            <input type="checkbox" onChange={onChange} checked={checked}/>
            <i></i>
            <div>{checked}</div>
        </span>
    );
};

export default CheckboxToggle;