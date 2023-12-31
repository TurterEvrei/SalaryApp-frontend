import './floatingInputStyles.css'
import React, {HTMLInputTypeAttribute, SetStateAction} from "react";

// const FloatingInput = ({children}: {children: JSX.Element}) => {
const FloatingInput = (
    {
        label,
        type,
        // value,
        onChange,
        inputName,
        value
    }: {
        label: string,
        type: HTMLInputTypeAttribute,
        // value: string | number;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        // onChange: React.Dispatch<SetStateAction<string>> | React.Dispatch<SetStateAction<number>>
        inputName?: string,
        value?: string | number
    }) => {

    return (
        <div className='inputBox__floating'>
            <input type={type} placeholder=' ' name={inputName} value={value} required
                // @ts-ignore
                   onChange={onChange}
            />
            {/*<span>{children.props.name}</span>*/}
            {/*{children}*/}
            <label>
                {/*{children.props.name}*/}
                {label}
            </label>
        </div>
    );
};

export default FloatingInput;