import React, {useState} from 'react';

const SidebarAnother = ({isShowSidebar}: {isShowSidebar: boolean}) => {

    const sidebarClasses = ["sidebar"]

    if (isShowSidebar) {
        sidebarClasses.push("showMenu")
    } else {
        sidebarClasses.push("close")
    }

    return (
        <div className={sidebarClasses.join(' ')}>
            <div className="logo-details">
                <i>Logo</i>
                <span className="logo_name">CodingLab</span>
            </div>
            <ul className="nav-links">
                <>
                {/*{navLinkList.map((link, index) =>*/}
                {/*    link.subMenu*/}
                {/*        ? <SidebarNavLinkWithSubMenu path={link.path}*/}
                {/*                                     name={link.name}*/}
                {/*                                     iconClass={link.iconClass}*/}
                {/*                                     subMenu={link.subMenu}/>*/}
                {/*        : <SidebarNavLink path={link.path}*/}
                {/*                          name={link.name}*/}
                {/*                          iconClass={link.iconClass}/>*/}
                {/*)}*/}
                    {/*<div className="profile-details2">*/}
                    {/*<li className="nav-profile">*/}
                    {/*    <a href="#">*/}
                    {/*        <i className="bi bi-box-arrow-right"></i>*/}
                    {/*        <span className="link_name">Name</span>*/}
                    {/*    </a>*/}
                    {/*    <ul className="sub-menu blank">*/}
                    {/*        <li><a className="link_name" href="#">Name</a></li>*/}
                    {/*    </ul>*/}
                    {/*</li>*/}
                    {/*</div>*/}
                <li>
                    <div className="profile-details">
                        <div className="profile-content">
                        </div>
                        <div className="name-job">
                            <div className="profile_name">Prem Shahiw</div>
                            <div className="job">Web Desginer</div>
                        </div>
                        <i className="bi bi-box-arrow-right"></i>
                    </div>
                </li>
                </>
            </ul>
        </div>
    );
};

export default SidebarAnother;