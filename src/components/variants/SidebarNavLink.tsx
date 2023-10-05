import React from 'react';

const SidebarNavLink = (
    {
        path,
        name,
        iconClass
    }: {
        path: string,
        name: string,
        iconClass: string
    }) => {

    return (
        <li>
            <a href={path}>
                <i className={iconClass}/>
                <span className="link_name">{name}</span>
            </a>
            <ul className="sub-menu blank">
                <li><a className="link_name" href={path}>{name}</a></li>
            </ul>
        </li>
    );
};

export default SidebarNavLink;