import React, {FormEvent, useContext, useState} from 'react';
import FloatingInput from "../UI/inputs/FloatingInput";
import {Context} from "../../index";
import cl from "./LoginForm.module.css"

const LoginForm = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const [showLogin, setShowLogin] = useState<boolean>(true)

    const {store} = useContext(Context);

    function showLoginHandler() {
        setShowLogin(!showLogin)
    }

    function switcherClassesHandler(flag: boolean): string {
        return flag ? [cl.formWrapper, cl.isActive].join(' ') : cl.switcher;
    }

    // @ts-ignore
    // const switchers = [...document.querySelectorAll('.switcher')]

    // switchers.forEach(item => {
    //     item.addEventListener('click', function() {
    //         switchers.forEach(item => item.parentElement.classList.remove('is-active'))
    //         // @ts-ignore
    //         this.parentElement.classList.add('is-active')
    //     })
    // })

    async function submitSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await store.login(email, password);
            // console.log(email, password)
        } catch (e) {
            console.log(e)
        }
    }

    async function submitSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await store.registration(name, email, password, phoneNumber);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center min-vh-100'>
            <section className={cl.formsSection}>
                <h1 className={cl.sectionTitle}>SalaryApp</h1>
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
                                <FloatingInput name='Email'
                                               type='email'
                                               onChange={(e) => setEmail(e.target.value)}
                                />
                                <FloatingInput name='Пароль'
                                               type='password'
                                               onChange={(e) => setPassword(e.target.value)}
                                />
                            </fieldset>
                            <button type="submit" className={cl.btnLogin}>Войти</button>
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
                                <FloatingInput name='Email'
                                               type='email'
                                               onChange={(e) => setEmail(e.target.value)}
                                />
                                <FloatingInput name='Пароль'
                                               type='password'
                                               onChange={(e) => setPassword(e.target.value)}
                                />
                                <FloatingInput name='Имя'
                                               type='text'
                                               onChange={(e) => setName(e.target.value)}
                                />
                                <FloatingInput name='Номер телефона'
                                               type='tel'
                                               onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </fieldset>
                            <button type="submit" className={cl.btnSignup}>Продолжить</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginForm;