import React from "react";
import classes from './TasksQueue.module.css'
import {useMutation, useQuery} from "@apollo/client";
import {QUEUE_TASKS} from "../../../apollo/queries";
import {authVar} from "../../../apollo/cache";
import {TAKE_TASK} from "../../../apollo/mutations";

export const TasksQueue = () => {
    const auth = authVar()
    const {loading, error, data} = useQuery(QUEUE_TASKS, {variables: {userId: auth.userId}, fetchPolicy: 'network-only', pollInterval: 500})
    const [takeTask] = useMutation(TAKE_TASK)

    const getTask = () => {
        takeTask({variables: {id: data.queueTasks[0].id, userId: auth.userId}})
    }

    if (loading) return 'Loading'

    return(
        <div className={classes.TasksQueue}>
            <div className={classes.TasksQueue__titleWrapper}>
                <h4>Очередь задач</h4>
                <div style={{display: "flex"}}>
                    {data.queueTasks.length > 0 && <div className={classes.TasksQueue__button} onClick={getTask}><i className="fa fa-get-pocket" aria-hidden="true" style={{marginRight:'20px'}}></i>Взять задачу</div>}
                    <div className={classes.TasksQueue__button}><i className="fa fa-history" aria-hidden="true" style={{marginRight:'20px'}}></i>История задач</div>
                </div>
            </div>
            <div className={classes.TasksQueue__headerWrapper}>
                <div >Задача</div>
                <div >Кто поставил</div>
                <div >Статус</div>
                <div >Приоритет</div>
            </div>
            {data.queueTasks.map(el => {
                const classesPriority = el.priority == 1 ? classes.TasksQueue__priority_low : el.priority == 2 ? classes.TasksQueue__priority_medium : classes.TasksQueue__priority_high
                return(
                    <div className={classes.TasksQueue__wrapper}>
                        <div className={classes.TasksQueue__title}>{el.title}</div>
                        <div className={classes.TasksQueue__title}>{el.from.user.fio}</div>
                        <div className={classes.TasksQueue__status + ' ' + classes.TasksQueue__status_inqueue}>В очереди</div>
                        <div className={classes.TasksQueue__priority + ' ' + classesPriority}>{el.priority == 1 ? 'Низкий' : el.priority == 2 ? 'Средний' : 'Высокий'}</div>
                    </div>
                )
            })}

        </div>
    )
}