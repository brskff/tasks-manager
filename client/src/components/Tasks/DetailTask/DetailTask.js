import React from "react";
import classes from './DetailTask.module.css'
import {ComboBox} from "../../UI/ComboBox/ComboBox";
import {useQuery} from "@apollo/client";
import {MY_TASK} from "../../../apollo/queries";

export const DetailTask = (props) => {
    const {loading, error, data} = useQuery(MY_TASK,{variables: {id: props.taskId}, fetchPolicy: 'network-only'})

    if (loading) return 'Loading'

    return(
        <div className={classes.AgreeTask__backdrop} onClick={backdropHandler}>
            <div className={classes.AgreeTask}>
                <h4>Согласовать задачу</h4>
                <div className={classes.AgreeTask__title}>
                    {data.task.title}
                </div>
                <p style={{marginBottom: '20px'}}>{data.task.text} </p>
                <div>От: {data.task.from.user.fio}<br /> Отдел: {data.task.from.department.name}</div>
                <div style={{display:"flex", flexDirection: 'column', marginTop: '20px'}}>
                    <div></div>

                </div>

            </div>
        </div>
    )
}