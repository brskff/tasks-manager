import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {TasksPage} from "./pages/TasksPage/TasksPage";
import {AuthPage} from "./pages/AuthPage/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path='/tasks' exact>
                    <TasksPage />
                </Route>
                <Redirect to="/tasks" />
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}