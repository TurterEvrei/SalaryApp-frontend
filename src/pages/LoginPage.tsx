import React from 'react';
import {observer} from "mobx-react-lite";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {
    // const [email, setEmail] = useState<string>('')
    // const [password, setPassword] = useState<string>('')
    // const [name, setName] = useState<string>('')
    // const [phoneNumber, setPhoneNumber] = useState<string>('')
    //
    // const {store} = useContext(Context)

    return (
        <LoginForm/>
    );
};

export default observer(LoginPage);