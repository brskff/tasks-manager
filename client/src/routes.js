import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {TasksPage} from "./pages/TasksPage/TasksPage";

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
        <h1>Auth page</h1>
        //Возврат страницы авторизации
    )
}