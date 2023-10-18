import React, {HTMLInputTypeAttribute} from 'react';
import cl from './flushedFloatingInput.module.css'

const FlushedFloatingInput = (
    {
        name,
        type,
        onChange,
        inputName,
        value
    }: {
        name: string,
        type: HTMLInputTypeAttribute,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        inputName?: string,
        value?: string | number
    }) => {

    return (
        <div className={cl.inputBox__floating}>
            <input type={type} placeholder=' ' name={inputName} value={value} required
                // @ts-ignore
                   onChange={onChange}
            />
            {/*<span>{children.props.name}</span>*/}
            {/*{children}*/}
            <label>
                {/*{children.props.name}*/}
                {name}
            </label>
        </div>
    );
};


export default FlushedFloatingInput;