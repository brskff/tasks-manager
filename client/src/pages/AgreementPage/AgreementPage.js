import React, {useState} from "react";
import {Helmet} from 'react-helmet'
import classes from './AgreementPage.module.css'
import {useQuery} from "@apollo/client";
import {GET_AGREEMENT_TASKS} from "../../apollo/queries";
import {authVar} from "../../apollo/cache";
import {AgreeTask} from "../../components/Tasks/AgreeTask/AgreeTask";

export const AgreementPage = () => {
    const auth = authVar()
    const {loading, error, data} = useQuery(GET_AGREEMENT_TASKS,{variables: {userId: auth.userId}, pollInterval: 500,}, )
    const [isAgreeVisible, setAgreeVisible] = useState(false)
    const [currentTask, setCurrentTask] = useState(null)

    const toggleAgreeTask = event => {
        if (event) {
            setCurrentTask(event.target.dataset.tid)
            setAgreeVisible(true)
        } else {
            setAgreeVisible(false)
        }

    }



    if (loading) return 'Loading'


    return(
        <>
            <Helmet>
                <title>Согласование</title>
            </Helmet>
            <AgreeTask
                visible={isAgreeVisible}
                taskId={currentTask}
                toggleAgreeTask={toggleAgreeTask}
            />
            <div className={classes.AgreementPage}>
                <h2>Согласование</h2>
                <div className={classes.AgreementPage__wrapper}>
                    <h4>Ожидающие вашего согласования</h4>
                    <div className={classes.AgreementPage__headerWrapper}>
                        <div >Задача</div>
                        <div >От кого</div>
                        <div >Статус</div>
                        <div >Приоритет</div>
                    </div>
                    {data.agreementTask.map(el => {
                        const classesPriority = el.priority == 1 ? classes.AgreementPage__priority_low : el.priority == 2 ? classes.AgreementPage__priority_medium : classes.AgreementPage__priority_high
                        return(
                            <div className={classes.AgreementPage__taskwrapper} key={el.id} data-tid={el.id}  onClick={toggleAgreeTask}>
                                <div className={classes.AgreementPage__title}>{el.title}</div>
                                <div className={classes.AgreementPage__title}>{el.from.user.fio}</div>
                                <div className={classes.AgreementPage__status + ' ' + classes.AgreementPage__status_agreement}>{el.status}</div>
                                <div className={classes.AgreementPage__priority + ' ' + classesPriority}>{el.priority == 1 ? 'Низкий' : el.priority == 2 ? 'Средний' : 'Высокий'}</div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}