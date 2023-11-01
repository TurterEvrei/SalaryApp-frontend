import React, {useState} from 'react';
import {Outlet} from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import cl from './Layout.module.css'

const Layout = () => {

    const [isShowSidebar, setShowSidebar] = useState<boolean>(false);

    function showSidebarHandler() {
        setShowSidebar(!isShowSidebar);
        console.log(isShowSidebar)
    }

    return (
        // <PageTransition>
            <>
                <Sidebar flag={isShowSidebar}/>
                <section className={cl.contentSection} onClick={() => setShowSidebar(false)}>
                    <Outlet/>
                </section>
            </>
        // {/*</PageTransition>*/}
    );
};

export default Layout;