import React from 'react';
import cl from "../Sidebar.module.css";
import {Link, useMatch} from "react-router-dom";
import {Role} from "../../../../models/user/Role";

const SidebarLink = (
    {
        to,
        name,
        iconClass,
        requiredRoles
    }: {
        to: string,
        name: string,
        iconClass:string,
        requiredRoles: Role[]
    }) => {

    const match = useMatch(to);

    return (
        <li className={match ? cl.active : ''}>
            <Link to={to}>
                <div className={cl.icon}>
                    <i className={iconClass}/>
                </div>
                <div className={cl.text}>{name}</div>
            </Link>
        </li>
    );
};

export default SidebarLink;