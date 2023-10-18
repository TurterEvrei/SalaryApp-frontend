import React, {useState} from 'react';
import cl from './Sidebar.module.css';
import {NavLink} from "react-router-dom";
import SidebarLink from "./navlinks/SidebarLink";
import {navLinkBottomList, navLinkMenuList} from "./navlinks/sidebarNavLinks";

const Sidebar = () => {

    const [isShowSidebar, setShowSidebar] = useState<boolean>(false);
    const [isActiveToggle, setActiveToggle] = useState<boolean>(false);

    function showSidebarHandler() {
        setShowSidebar(!isShowSidebar);
        setActiveToggle(!isActiveToggle);
        console.log(isShowSidebar)
    }

    function activeToggleHandler() {
        setActiveToggle(!isActiveToggle);
        console.log(isActiveToggle)
    }

    const sidebarClasses = [cl.sidebar]
    const menuToggleClasses = [cl.menuToggle]

    if (isActiveToggle) {
        menuToggleClasses.push(cl.active)
    }

    if (isShowSidebar) {
        sidebarClasses.push(cl.active)
    }

    return (
        <>
        <div className={menuToggleClasses.join(' ')} onClick={showSidebarHandler}></div>
        <div className={sidebarClasses.join(' ')}>
            <ul>
                <li className={cl.logo}>
                    <a href="#">
                        <div className={cl.icon}>
                            <i className='bi bi-calculator-fill'/>
                        </div>
                        <div className={cl.text}>Website logo</div>
                    </a>
                </li>
                <div className="MenuList">
                    {navLinkMenuList.map((navLink, index) =>
                        <SidebarLink to={navLink.path}
                                     name={navLink.name}
                                     iconClass={navLink.iconClass}
                                     requiredRoles={navLink.roles}
                                     key={navLink.path}
                        />
                    )}
                </div>
                <div className={cl.bottom}>
                    {/*<li>*/}
                    {/*    <a href="#">*/}
                    {/*        <div className={cl.icon}>*/}
                    {/*            <div className="imgBox">*/}
                    {/*                <img src="../../../../public/logo.jpg" alt=""/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className={cl.text}>Belbek Abdul</div>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    {navLinkBottomList.map((navLink, index) =>
                        <SidebarLink to={navLink.path}
                                     name={navLink.name}
                                     iconClass={navLink.iconClass}
                                     requiredRoles={navLink.roles}
                                     key={navLink.path}
                        />
                    )}
                </div>
            </ul>
            
        </div>
        </>
    );
};

export default Sidebar;