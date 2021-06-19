import React from "react";
import classes from './DeliveredTasks.module.css'
import {useQuery} from "@apollo/client";
import {DELIVERED_TASKS} from "../../../apollo/queries";
import {authVar} from "../../../apollo/cache";

export const DeliveredTasks = (props) => {
    const auth = authVar()
    const {loading, error, data} = useQuery(DELIVERED_TASKS, {variables: {userId: auth.userId}, fetchPolicy: 'network-only',pollInterval: 500})

    if (loading) return 'Loading'

    console.log(data)
    return(
        <div className={classes.DeliveredTasks}>
            <div className={classes.DeliveredTasks__titleWrapper}>
                <h4>Поставленные задачи</h4>
                <div>
                    <div className={classes.DeliveredTasks__button} onClick={props.toggleCreateTask}><i className="fa fa-plus" aria-hidden="true" style={{marginRight:'20px'}}></i>Создать задачу</div>
                </div>
            </div>
            <div className={classes.DeliveredTasks__headerWrapper}>
                <div >Задача</div>
                <div >Исполнитель</div>
                <div >Статус</div>
                <div >Приоритет</div>
            </div>
            {data.deliveredTasks.map(el => {
                const classesPriority = el.priority == 1 ? classes.DeliveredTasks__priority_low : el.priority == 2 ? classes.DeliveredTasks__priority_medium : classes.DeliveredTasks__priority_high
                const classesStatus = el.status == 'Согласование' ? classes.DeliveredTasks__status_agreement : el.status == 'Выполняется' ? classes.DeliveredTasks__status_inprogress : classes.DeliveredTasks__status_inqueue
                return (
                    <div className={classes.DeliveredTasks__wrapper} key={el.id}>
                    <div className={classes.DeliveredTasks__title}>{el.title}</div>
                    <div className={classes.DeliveredTasks__title}>{el.to.user !== null ? el.to.user.fio: 'Не назначен'}</div>
                    <div className={classes.DeliveredTasks__status + ' ' + classesStatus}>{el.status}</div>
                    <div className={classes.DeliveredTasks__priority + ' ' + classesPriority}>{el.priority == 1 ? 'Низкий' : el.priority == 2 ? 'Средний' : 'Высокий'}</div>
                </div>)
            })}
        </div>
    )
}