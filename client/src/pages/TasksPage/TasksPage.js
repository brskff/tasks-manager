import React, {useState} from "react";
import {Helmet} from 'react-helmet'
import classes from './TasksPage.module.css'
import {MyTasks} from "../../components/Tasks/MyTasks/MyTasks";
import {TasksQueue} from "../../components/Tasks/TasksQueue/TasksQueue";
import {DeliveredTasks} from "../../components/Tasks/DeliveredTasks/DeliveredTasks";
import {CreateTasks} from "../../components/Tasks/CreateTasks/CreateTasks";

export const TasksPage = () => {
    const [isCreateVisible, setCreateVisible] = useState(false)

    const toggleCreateTask = () => {
        setCreateVisible(!isCreateVisible)
    }

    return(
        <>
            <Helmet>
                <title>📋 Задачи</title>
            </Helmet>
                <CreateTasks
                    visible={isCreateVisible}
                    toggleCreateTask={toggleCreateTask}
                />
            <div className={classes.TasksPage}>
                <h2>Задачи</h2>
                <MyTasks />
                <TasksQueue />
                <DeliveredTasks
                    toggleCreateTask={toggleCreateTask}
                />
            </div>
        </>


    )
}