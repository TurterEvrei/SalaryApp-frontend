import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import LoginPage from "./pages/LoginPage";
import AppRouter from "./components/router/AppRouter";
import {Center, Spinner} from "@chakra-ui/react";
import Loader from "./components/UI/loader/Loader";

function App() {

    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('access')) {
            store.checkAuth()
        }

    }, [])

    if (store.isLoading) {
        return (
            <Loader/>
        );
    }

    if (!store.isAuth) {
        return (
            <LoginPage/>
        )
    }

  return (
    <div className="App">
        <AppRouter/>
    </div>
  );
}

export default observer(App);