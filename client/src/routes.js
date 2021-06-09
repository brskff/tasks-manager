import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {TasksPage} from "./pages/TasksPage/TasksPage";
import {AuthPage} from "./pages/AuthPage/AuthPage";
import {StaffPage} from "./pages/StaffPage/StaffPage";
import {CreateUserPage} from "./pages/CreateUserPage/CreateUserPage";
import {CreateDepartmentPage} from "./pages/CreateDepartmentPage/CreateDepartmentPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path='/tasks' exact>
                    <TasksPage />
                </Route>
                <Route path='/staff' exact>
                    <StaffPage />
                </Route>
                <Route path='/create/user' exact>
                    <CreateUserPage />
                </Route>
                <Route path='/create/department' exact>
                    <CreateDepartmentPage />
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