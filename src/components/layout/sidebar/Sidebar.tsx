import React, {useContext, useState} from 'react';
import cl from './Sidebar.module.css';
import {Link, NavLink} from "react-router-dom";
import SidebarLink from "./navlinks/SidebarLink";
import {navLinkBottomList, navLinkMenuList} from "./navlinks/sidebarNavLinks";
import {Context} from "../../../index";
import {errorLogoutToast, successLogoutToast} from "../../toast/Toasts";
import {useToast} from "@chakra-ui/react";

const Sidebar = (
    {
        flag,
    }: {
        flag: boolean,
    }
) => {

    const [isShowSidebar, setShowSidebar] = useState<boolean>(flag);
    const [isActiveToggle, setActiveToggle] = useState<boolean>(flag);
    const {store} = useContext(Context)
    const toast = useToast()

    function showSidebarHandler() {
        setShowSidebar(!isShowSidebar);
        setActiveToggle(!isActiveToggle);
    }

    function hideSidebarHandler() {
        setShowSidebar(false)
        setActiveToggle(false);
    }

    const sidebarClasses = [cl.sidebar]
    const menuToggleClasses = [cl.menuToggle]

    if (isActiveToggle) {
        menuToggleClasses.push(cl.active)
    }

    if (isShowSidebar) {
        sidebarClasses.push(cl.active)
    }

    async function logout() {
        const response = await store.logout()
        store.isAuth ? errorLogoutToast(toast) : successLogoutToast(toast)
    }

    return (
        <>
        <div className={menuToggleClasses.join(' ')} onClick={showSidebarHandler}></div>
        <div className={sidebarClasses.join(' ')}>
            <ul>
                <li className={cl.logo}>
                    <a href="#">
                        <div className={cl.icon}>
                            <i className='bi bi-cash-coin'/>
                        </div>
                        <div className={cl.text}>HuiMonet</div>
                    </a>
                </li>
                <div className="MenuList">
                    {navLinkMenuList.map((navLink, index) =>
                        <SidebarLink to={navLink.path}
                                     name={navLink.name}
                                     iconClass={navLink.iconClass}
                                     requiredRoles={navLink.roles}
                                     key={navLink.path}
                                     onClickFunc={hideSidebarHandler}
                        />
                    )}
                </div>
                <div className={cl.bottom}>
                    {navLinkBottomList.map((navLink, index) =>
                        <SidebarLink to={navLink.path}
                                     name={navLink.name}
                                     iconClass={navLink.iconClass}
                                     requiredRoles={navLink.roles}
                                     key={navLink.path}
                                     onClickFunc={hideSidebarHandler}
                        />
                    )}
                    <li onClick={logout}>
                        <a>
                            <div className={cl.icon}>
                                <i className={'bi bi-box-arrow-right'}/>
                            </div>
                            <div className={cl.text}>Выход</div>
                        </a>
                    </li>
                </div>
            </ul>
            
        </div>
        </>
    );
};

export default Sidebar;