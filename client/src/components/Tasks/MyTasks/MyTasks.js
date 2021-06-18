import React from "react";
import classes from './MyTasks.module.css'

export const MyTasks = () => {


    return(
        <div className={classes.MyTask}>
            <div className={classes.MyTask__titleWrapper}>
                <h4>Текущая задача</h4>
                <div>
                    <div className={classes.MyTask__button}><i className="fa fa-check-square-o" aria-hidden="true" style={{marginRight:'20px'}}></i>Выполнено</div>
                </div>
            </div>
            <div className={classes.MyTask__wrapper}>
                <div className={classes.MyTask__title}>Печатная форма для квартального отчета</div>
                <div className={classes.MyTask__title}>Рыбкин Сергей Денисович</div>
                <div className={classes.MyTask__status + ' ' + classes.MyTask__status_inprogress}>Выполняется</div>
                <div className={classes.MyTask__priority + ' ' + classes.MyTask__priority_medium}>Средний</div>
            </div>
            {/*<div className={classes.TasksQueue__wrapper}>*/}
            {/*    <div className={classes.TasksQueue__title}>Печатная форма для квартального отчета</div>*/}
            {/*    <div className={classes.TasksQueue__title}>Рыбкин Сергей Денисович</div>*/}
            {/*    <div className={classes.TasksQueue__status + ' ' + classes.TasksQueue__status_inqueue}>В очереди</div>*/}
            {/*    <div className={classes.TasksQueue__priority + ' ' + classes.TasksQueue__priority_medium}>Средний</div>*/}
            {/*</div>*/}
        </div>
    )
}