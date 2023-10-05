import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import LoginPage from "./pages/LoginPage";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/router/PrivateRoute";
import {forAdmin, forManager, forMaster, forUser} from "./utils/requiredRoles";
import Layout from "./components/layout/Layout";
import AppRouter from "./components/router/AppRouter";
import {IEmployee} from "./models/dto/IEmployee";
import EmployeeService from "./services/EmployeeService";

function App() {

    const {store} = useContext(Context)
    // const [empList, setEmpList] = useState<IEmployee[]>([])

    useEffect(() => {
        if (localStorage.getItem('access')) {
            store.checkAuth()
                // .then(() => {
                    // store.fetchUserDepartments()
                    // store.fetchUserProfile()
                    // store.fetchUserEmployee()
                // }
            // )
        }

    }, [])

    // async function testApi() {
    //     const response = await EmployeeService.fetchEmployeesByDepartmentId(1)
    //     setEmpList(response.data)
    // }

    if (store.isLoading) {
        return <div>Loading...</div>;
    }

    if (!store.isAuth) {
        return (
            <LoginPage/>
            // <Layout/>
        // <AppRouter/>
        )
    }

  return (
    <div className="App">
        <AppRouter/>
        {/*<button style={{position: "absolute", top: "50%", left: "50%"}}*/}
        {/*    onClick={testApi}>*/}
        {/*    TESSSSSSSSSSSSSSST*/}
        {/*</button>*/}
    </div>
  );
}

export default observer(App);