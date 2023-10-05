import React, {useContext} from 'react';
import {Role} from "../../models/user/Role";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";

const PrivateRoute = ({children, roles}: {children: JSX.Element, roles: Role[]}) => {

    const {store} = useContext(Context);
    let location = useLocation();

    const userHasRequiredRole = store.userCred && roles.some(role => store.userCred.roles.includes(role))

    if (store.isLoading) {
        return <p>Checking auth...</p>
    }

    if (!store.isAuth) {
        //navigate to login
    }

    if (store.isAuth && !userHasRequiredRole) {
        return <p>Access denied</p>
    }

    return children;
};

export default PrivateRoute;