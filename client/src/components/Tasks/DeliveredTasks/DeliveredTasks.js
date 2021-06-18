import React from "react";
import classes from './DeliveredTasks.module.css'

export const DeliveredTasks = (props) => {

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
            {/*<div className={classes.DeliveredTasks__wrapper}>*/}
            {/*    <div className={classes.DeliveredTasks__title}>Печатная форма для квартального отчета</div>*/}
            {/*    <div className={classes.DeliveredTasks__title}>Не назначен</div>*/}
            {/*    <div className={classes.DeliveredTasks__status + ' ' + classes.DeliveredTasks__status_agreement}>Согласование</div>*/}
            {/*    <div className={classes.DeliveredTasks__priority + ' ' + classes.DeliveredTasks__priority_medium}>Средний</div>*/}
            {/*</div>*/}
        </div>
    )
}