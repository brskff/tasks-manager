import React from "react";
import classes from './MyTasks.module.css'
import {useQuery} from "@apollo/client";
import {MY_TASK} from "../../../apollo/queries";
import {authVar} from "../../../apollo/cache";

export const MyTasks = () => {
    const auth = authVar()

    const {loading, error, data} = useQuery(MY_TASK, {variables: {userId: auth.userId}, pollInterval: 500})

    if (loading) return 'Loading'

    let classesPriority = ''

    if (data.myTask) {
        classesPriority = data.myTask.priority == 1 ? classes.MyTaske__priority_low : data.myTask.priority == 2 ? classes.MyTask__priority_medium : classes.MyTask__priority_high
    }
    return(
        <div className={classes.MyTask}>
            <div className={classes.MyTask__titleWrapper}>
                <h4>Текущая задача</h4>
                <div>
                    {data.myTask && <div className={classes.MyTask__button}><i className="fa fa-check-square-o" aria-hidden="true" style={{marginRight:'20px'}}></i>Выполнено</div>}
                </div>
            </div>
            {data.myTask && <div className={classes.MyTask__wrapper}>
                <div className={classes.MyTask__title}>{data.myTask.title}</div>
                <div className={classes.MyTask__title}>{data.myTask.from.user.fio}</div>
                <div className={classes.MyTask__status + ' ' + classes.MyTask__status_inprogress}>{data.myTask.status}</div>
                <div className={classes.MyTask__priority + ' ' + classesPriority}>{data.myTask.priority == 1 ? 'Низкий' : data.myTask.priority == 2 ? 'Средний' : 'Высокий'}</div>
            </div>}

            {/*<div className={classes.TasksQueue__wrapper}>*/}
            {/*    <div className={classes.TasksQueue__title}>Печатная форма для квартального отчета</div>*/}
            {/*    <div className={classes.TasksQueue__title}>Рыбкин Сергей Денисович</div>*/}
            {/*    <div className={classes.TasksQueue__status + ' ' + classes.TasksQueue__status_inqueue}>В очереди</div>*/}
            {/*    <div className={classes.TasksQueue__priority + ' ' + classes.TasksQueue__priority_medium}>Средний</div>*/}
            {/*</div>*/}
        </div>
    )
}