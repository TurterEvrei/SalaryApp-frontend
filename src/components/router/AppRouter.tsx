import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Layout from "../layout/Layout";
import PrivateRoute from "./PrivateRoute";
import {appRoutesList} from "./appRoutes";

const AppRouter = () => {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route element={<Layout/>}>
            {appRoutesList.map(route =>
                <Route path={route.path}
                       key={route.path}
                       element={
                            <PrivateRoute roles={route.requiredRoles}>
                                    {route.element}
                            </PrivateRoute>
                       }
                />
            )}
            <Route path={'*'} element={<Navigate to={'/statistic'} replace/> }/>
        </Route>
    ))

    return (
        <RouterProvider router={router}/>
    );
};

export default AppRouter;