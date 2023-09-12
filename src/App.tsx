import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import LoginForm from "./components/LoginForm/LoginForm";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import {forAdmin, forManager, forMaster, forUser} from "./utils/requiredRoles";

function App() {

    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('access')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <div>Loading...</div>;
    }

    if (!store.isAuth) {
        return (
            <LoginForm/>
        )
    }

  return (
    <div className="App">
        <LoginForm/>
      Salary App
        {store.isAuth
            ? <div>Авторизован</div>
            : <div>Не авторизован</div>}
        ${store.userCred.email}
        ${store.userCred.roles}
        <Routes>
            <Route path='/all' element={
                <div>for all</div>
            }/>
            <Route path='/user' element={
                <PrivateRoute roles={forUser}>
                    <div>for users</div>
                </PrivateRoute>
            }/>
            <Route path='/master' element={
                <PrivateRoute roles={forMaster}>
                    <div>for master</div>
                </PrivateRoute>
            }/>
            <Route path='/manager' element={
                <PrivateRoute roles={forManager}>
                    <div>for manager</div>
                </PrivateRoute>
            }/>
            <Route path='/admin' element={
                <PrivateRoute roles={forAdmin}>
                    <div>for admin</div>
                </PrivateRoute>
            }/>
        </Routes>
    </div>
  );
}

export default observer(App);