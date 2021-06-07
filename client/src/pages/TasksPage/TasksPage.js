import React from "react";
import {Helmet} from 'react-helmet'
import classes from './TasksPage.module.css'

export const TasksPage = () => {
    return(
        <>
            <Helmet>
                <title>Задачи</title>
            </Helmet>
            <div className={classes.TasksPage}>
                <h2>Задачи</h2>
            </div>
        </>


    )
}