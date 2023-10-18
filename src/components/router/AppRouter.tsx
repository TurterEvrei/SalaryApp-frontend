import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import Layout from "../layout/Layout";
import PrivateRoute from "./PrivateRoute";
import {forAdmin, forManager, forMaster, forUser} from "../../utils/requiredRoles";
import {appRoutesList} from "./appRoutes";
import CalcPage from "../../pages/CalcPage";

const AppRouter = () => {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            {appRoutesList.map(route =>
                <Route path={route.path}
                       key={route.path}
                       element={
                    // route.element
                    <PrivateRoute roles={route.requiredRoles}>
                        {route.element}
                    </PrivateRoute>
                }/>
            )}
            {/*<Route path='/calc'*/}
            {/*       element={<CalcPage/>}*/}
            {/*       // loader={calcInfoLoader}*/}
            {/*/>*/}

            <Route path='/user' element={
                <PrivateRoute roles={forUser}>
                    <div>for users</div>
                </PrivateRoute>
            }/>
        </Route>
    ))

    return (
        <RouterProvider router={router}/>
    );
};

export default AppRouter;