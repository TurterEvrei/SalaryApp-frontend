import React from 'react';
import AdminDash from "../components/admindash/AdminDash";
import cl from "../components/calculator/Calculator.module.css";
const AdminPage = () => {
    return (
        // <div className={cl.container}>
        //     <div className={cl.pageHeader}>
        //         <span className={cl.pageDescription}>Абсолютная власть</span>
        //         <span className={cl.pageName}>Админ. панель</span>
        //     </div>
            <AdminDash/>
        // </div>
    );
};

export default AdminPage;