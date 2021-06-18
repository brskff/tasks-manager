import React from "react";
import classes from './TasksQueue.module.css'

export const TasksQueue = () => {

    return(
        <div className={classes.TasksQueue}>
            <div className={classes.TasksQueue__titleWrapper}>
                <h4>Очередь задач</h4>
                <div style={{display: "flex"}}>
                    <div className={classes.TasksQueue__button}><i className="fa fa-get-pocket" aria-hidden="true" style={{marginRight:'20px'}}></i>Взять задачу</div>
                    <div className={classes.TasksQueue__button}><i className="fa fa-history" aria-hidden="true" style={{marginRight:'20px'}}></i>История задач</div>
                </div>
            </div>
            <div className={classes.TasksQueue__headerWrapper}>
                <div >Задача</div>
                <div >Кто поставил</div>
                <div >Статус</div>
                <div >Приоритет</div>
            </div>
            {/*<div className={classes.TasksQueue__wrapper}>*/}
            {/*    <div className={classes.TasksQueue__title}>Получить диплом</div>*/}
            {/*    <div className={classes.TasksQueue__title}>Рыбкин Сергей Денисович</div>*/}
            {/*    <div className={classes.TasksQueue__status + ' ' + classes.TasksQueue__status_inpqueue}>В очереди</div>*/}
            {/*    <div className={classes.TasksQueue__priority + ' ' + classes.TasksQueue__priority_high}>Высокий</div>*/}
            {/*</div>*/}

        </div>
    )
}