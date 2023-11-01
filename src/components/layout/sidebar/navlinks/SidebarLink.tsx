import React, {useContext} from 'react';
import cl from "../Sidebar.module.css";
import {Link, useMatch} from "react-router-dom";
import {Role} from "../../../../models/user/Role";
import {Context} from "../../../../index";

const SidebarLink = (
    {
        to,
        name,
        iconClass,
        requiredRoles,
        onClickFunc,
    }: {
        to: string,
        name: string,
        iconClass:string,
        requiredRoles: Role[],
        onClickFunc?: () => void,
    }) => {

    const {store} = useContext(Context)

    const match = useMatch(to);

    return (
        <li className={match ? cl.active : ''}
            onClick={onClickFunc}
            hidden={!store.userCred.roles.some(role => requiredRoles.includes(role))}
        >
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