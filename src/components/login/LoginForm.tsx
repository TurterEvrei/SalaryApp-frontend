import React, {useContext, useState} from 'react';
import FloatingInput from "../UI/inputs/FloatingInput";
import {Context} from "../../index";
import cl from "./LoginForm.module.css"
import {Box, Button, Center, Checkbox, useToast} from "@chakra-ui/react";
import {errorLoginToast, successLoginToast, warningLoginToast} from "../toast/Toasts";

const LoginForm = () => {

    const [email, setEmail] = useState<string>(localStorage.getItem('email') || '');
    const [password, setPassword] = useState<string>(localStorage.getItem('password') || '');
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const [showLogin, setShowLogin] = useState<boolean>(true)
    const [rememberMe, setRememberMe] = useState<boolean>(!!(localStorage.getItem('email') && localStorage.getItem('password')))
    const [acceptRools, setAcceptRools] = useState<boolean>(false)

    const {store} = useContext(Context);
    const toast = useToast()

    function showLoginHandler() {
        setShowLogin(!showLogin)
    }

    function rememberMeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setRememberMe(e.target.checked);
    }

    function switcherClassesHandler(flag: boolean): string {
        return flag ? [cl.formWrapper, cl.isActive].join(' ') : cl.switcher;
    }

    function isLoginAvailable(): boolean {
        return !!(email.length && password.length);
    }

    function isRegisterAvailable(): boolean {
        return !!(name.length && phoneNumber.length && acceptRools && isLoginAvailable())
    }

    async function submitSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isLoginAvailable()) {
            try {
                await store.login(email, password);
                // console.log(email, password)
                if (rememberMe) {
                    localStorage.setItem('email', email)
                    localStorage.setItem('password', password)
                } else {
                    localStorage.removeItem('email')
                    localStorage.removeItem('password')
                }
            } catch (e) {
                console.log(e)
            }
            store.isAuth ? successLoginToast(toast) : errorLoginToast(toast)
        } else {
            warningLoginToast(toast)
        }

    }

    async function submitSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (isRegisterAvailable()) {
            try {
                await store.registration(name, email, password, phoneNumber);
            } catch (e) {
                console.log(e)
            }
            store.isAuth ? successLoginToast(toast) : errorLoginToast(toast)
        } else {
            warningLoginToast(toast)
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <section className={cl.formsSection}>
                <h1 className={cl.sectionTitle}>HuiMonet</h1>
                <div className={cl.forms}>
                    <div className={switcherClassesHandler(showLogin)}>
                        <button type="button"
                                className={[cl.switcher, cl.switcherLogin].join(' ')}
                                onClick={showLoginHandler}
                        >
                            Вход
                            <span className={cl.underline}></span>
                        </button>
                        <form className={[cl.form, cl.formLogin].join(' ')}
                              onSubmit={submitSignIn}
                        >
                            <fieldset>
                                <FloatingInput label='Email'
                                               type='email'
                                               onChange={(e) => setEmail(e.target.value)}
                                               value={email}
                                />
                                <FloatingInput label='Пароль'
                                               type='password'
                                               onChange={(e) => setPassword(e.target.value)}
                                               value={password}
                                />
                                <Center>
                                    <Checkbox alignSelf={'center'}
                                              colorScheme={'primary'}
                                              onChange={rememberMeHandler}
                                              isChecked={rememberMe}
                                    >
                                        Запомнить меня
                                    </Checkbox>
                                </Center>
                            </fieldset>

                            <Button type="submit"
                                    colorScheme={'primary'}
                                    className={cl.btnLogin}
                            >
                                Войти
                            </Button>
                            {/*<button type="submit" className={cl.btnLogin}>Войти</button>*/}
                        </form>
                    </div>
                    <div className={switcherClassesHandler(!showLogin)}>
                        <button type="button"
                                className={[cl.switcher, cl.switcherSignup].join(' ')}
                                onClick={showLoginHandler}
                        >
                            Регистрация
                            <span className={cl.underline}></span>
                        </button>
                        <form className={[cl.form, cl.formSignup].join(' ')}
                              onSubmit={submitSignUp}
                              autoComplete='false'
                        >
                            <fieldset>
                                <FloatingInput label='Email'
                                               type='email'
                                               onChange={(e) => setEmail(e.target.value)}
                                />
                                <FloatingInput label='Пароль'
                                               type='password'
                                               onChange={(e) => setPassword(e.target.value)}
                                />
                                <FloatingInput label='Имя'
                                               type='text'
                                               onChange={(e) => setName(e.target.value)}
                                />
                                <FloatingInput label='Номер телефона'
                                               type='tel'
                                               onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <Center>
                                    <Checkbox alignSelf={'center'}
                                              colorScheme={'primary'}
                                              onChange={e => setAcceptRools(e.target.checked)}
                                              isChecked={acceptRools}
                                    >
                                        <Box w={'250px'} color={'whiteAlpha.800'}>
                                            Отказываюсь от любых претензий к создателям и владельцам данного ресурса
                                        </Box>
                                    </Checkbox>
                                </Center>
                            </fieldset>
                            <Button type="submit"
                                    className={cl.btnSignup}
                                    colorScheme={'primary'}
                            >
                                Продолжить
                            </Button>
                            {/*<button type="submit" className={cl.btnSignup}>Продолжить</button>*/}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginForm;