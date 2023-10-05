import React from 'react';
import cl from "../Calculator.module.css";

const NoDepartment = () => {
    return (
        <div className={cl.container}>
            <div className={cl.pageHeader}>
                <span className={cl.pageDescription}>Расчет зарплаты сотрудников</span>
                <span className={cl.pageName}>Калькулятор</span>
            </div>
            <div className={cl.cardWrapper}>
                <div className={cl.card}>
                    <div className={cl.header}>
                        Ошибка
                    </div>
                    <div className={cl.data}>
                        <div className={cl.exception}>
                            Ваш аккаунт не привязан к предприятию.
                            Обратитесь к администратору.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoDepartment;