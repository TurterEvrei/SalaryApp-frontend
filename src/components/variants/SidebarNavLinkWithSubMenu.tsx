import React, {useState} from 'react';
import {Button} from "react-bootstrap";

const SidebarNavLinkWithSubMenu = (
    {
        path,
        name,
        iconClass,
        subMenu
    }: {
        path: string,
        name: string,
        iconClass: string,
        subMenu: {subName: string, subPath: string}[]
    }) => {

    const [isShowSubMenu, setShowSubMenu] = useState<boolean>(false);

    const liClasses = [] as string[]

    if (isShowSubMenu) {
        liClasses.push('showMenu')
    }

    function showSubMenuHandler() {
        setShowSubMenu(!isShowSubMenu);
    }

    return (
        <li className={liClasses.join(' ')}>
            <div className="iocn-link">
                <a href={path}>
                    <i className={iconClass}></i>
                    <span className="link_name">{name}</span>
                </a>
                <i className='bi bi-caret-down-fill arrow'
                   onClick={showSubMenuHandler}
                ></i>
            </div>
            <ul className="sub-menu">
                <li><a className="link_name" href={path}>{name}</a></li>
                {subMenu.map((value, index) =>
                    <li key={index}>
                        <a href={value.subPath}>{value.subName}</a>
                    </li>
                )}
            </ul>
        </li>
    );
};

export default SidebarNavLinkWithSubMenu;