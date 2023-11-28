import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import React from "react";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/dashboard/forms/activityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/Errors/TestError";
import NotFound from "../../features/Errors/NotFound";
import ServerErrors from "../../features/Errors/serverErrors";

export const routes: RouteObject[] = [
    {
        path: '/', // base route
        element: <App />, // base component
        children: [
            {path: '', element: <HomePage />},
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'createActivity', element: <ActivityForm  key={'create'}/>},
            {path: 'manage/:id', element: <ActivityForm  key={'manage'}/>},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to="/not-found" />},
            {path: 'server-error', element: <ServerErrors />},

        ]

    }
]

export const router = createBrowserRouter(routes)