import React, {useState} from "react";
import classes from './AgreeTask.module.css'
import {ComboBox} from "../../UI/ComboBox/ComboBox";
import {useMutation, useQuery} from "@apollo/client";
import {GET_TASK} from "../../../apollo/queries";
import {
    CANCEL_TASK_FROM_CHIEF, CANCEL_TASK_FROM_CURATOR,
    CONFIRM_TASK_FROM_CHIEF,
    CONFIRM_TASK_FROM_CURATOR,
    SEND_TASK_TO_CHIEF
} from "../../../apollo/mutations";

export const AgreeTask = (props) => {
    const [executor, setExecutor] = useState('')
    const {loading, error, data} = useQuery(GET_TASK, {variables:{id: props.taskId}, fetchPolicy: 'network-only'})
    const [confirmFromChief] = useMutation(CONFIRM_TASK_FROM_CHIEF)
    const [confirmFromCurator] = useMutation(CONFIRM_TASK_FROM_CURATOR)
    const [cancelFromChief] = useMutation(CANCEL_TASK_FROM_CHIEF)
    const [cancelFromCurator] = useMutation(CANCEL_TASK_FROM_CURATOR)
    const [sentToCurator] = useMutation(SEND_TASK_TO_CHIEF)

    const changeHandler = event => {
        setExecutor(event.target.value)
    }

    const backdropHandler = event => {
        if (event.target === document.querySelector('.'+classes.AgreeTask__backdrop)) {
            setExecutor('')
            props.toggleAgreeTask()
        }
    }

    const cancelHandler = () => {
        if (data.task.signature.chief == false) {
            cancelFromChief({variables: {id: data.task.id}})
        } else {
            cancelFromCurator({variables: {id: data.task.id}})
        }
        setExecutor('')
        props.toggleAgreeTask()
    }

    const okHandler = () => {
        if (data.task.signature.chief == false) {
            confirmFromChief({variables: {id: data.task.id, executor}})
        } else {
            confirmFromCurator({variables: {id: data.task.id}})
        }

        setExecutor('')
        props.toggleAgreeTask()
    }

    const sendToCurator = () => {
        sentToCurator({variables: {id: data.task.id, executor}})
        setExecutor('')
        props.toggleAgreeTask()
    }

    if (loading) return 'Loading'

    if (props.visible === false) {
        return (<div style={{display: 'none'}}></div>)
    }

    return (
        <div className={classes.AgreeTask__backdrop} onClick={backdropHandler}>
            <div className={classes.AgreeTask}>
                <h4>Согласовать задачу</h4>
                 <div className={classes.AgreeTask__title}>
                     {data.task.title}
                 </div>
                <p style={{marginBottom: '20px'}}>{data.task.text} </p>
                <div>От: {data.task.from.user.fio}<br /> Отдел: {data.task.from.department.name}</div>
                <div style={{display:"flex", flexDirection: 'column', marginTop: '20px'}}>
                    {data.task.signature.chief == false ? <ComboBox
                        id="executor"
                        label="Исполнитель"
                        name="executor"
                        data={data.task.to.department.staff.map(el => ({id: el.id, name: el.fio}))}
                        value={executor}
                        onChange={changeHandler}
                    />: <div>Исполнитель: {data.task.to.user.fio}</div>}


                </div>
                <div className={classes.AgreeTask__buttonWrapper}>
                    <div className={classes.AgreeTask__button + ' ' + classes.AgreeTask__button_cancel} onClick={cancelHandler}>Отмена</div>
                    {data.task.signature.chief == false && data.task.status === 'Согласование' && <div className={classes.AgreeTask__button + ' ' + classes.AgreeTask__button_warning} onClick={sendToCurator}>Согласовать с куратором</div>}
                    <div className={classes.AgreeTask__button + ' ' + classes.AgreeTask__button_success} onClick={okHandler}>Подтвердить</div>
                </div>

            </div>
        </div>
    )
}