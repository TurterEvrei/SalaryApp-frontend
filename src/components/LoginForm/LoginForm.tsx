import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    const {store} = useContext(Context)

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Password'
            />
            <input
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder='Name'
            />
            <input
                onChange={e => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                type="text"
                placeholder='Phone number'
            />
            <button onClick={() => store.login(email, password)}>
                Login
            </button>
            <button onClick={() => store.registration(name, email, password, phoneNumber)}>
                Register
            </button>
            <button onClick={() => store.logout()}>
                Logout
            </button>
        </div>
    );
};

export default observer(LoginForm);