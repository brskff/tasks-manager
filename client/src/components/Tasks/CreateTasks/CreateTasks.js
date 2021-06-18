import React, {useEffect, useState} from "react";
import classes from './CreateTasks.module.css'
import {Input} from "../../UI/Input/Input";
import {TextArea} from "../../UI/TextArea/TextArea";
import {ComboBox} from "../../UI/ComboBox/ComboBox";
import {useQuery} from "@apollo/client";
import {GET_DEPARTMENTS} from "../../../apollo/queries";
import {useHttp} from "../../../hooks/http.hook";
import {authVar} from "../../../apollo/cache";

export const CreateTasks = (props) => {
    const {loading, error, data} = useQuery(GET_DEPARTMENTS)
    const {request} = useHttp()
    const auth = authVar()
    const [form, setForm] = useState({
        title: '',
        department: '',
        priority: '',
        text: '',
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const successHandler = async () => {
        try {
            const data = await request('/api/task/create', 'POST', {form: {...form, userId: auth.userId}}, {
                Authorization: `Bearer ${auth.token}`
            })

            //TODO Если не авторизован то логоут
            setForm({title: '', department: '', priority: '', text: ''})
            props.toggleCreateTask()
        } catch (e) {
            
        }
    }

    const cancelHandler = () => {
        setForm({title: '', department: '', priority: '', text: ''})
        props.toggleCreateTask()
    }

    const backdropHandler = event => {
        if (event.target === document.querySelector('.'+classes.CreateTasks__backdrop)) {
            setForm({title: '', department: '', priority: '', text: ''})
            props.toggleCreateTask()
        }
    }

    if (props.visible === false) {
        return (<div style={{display: 'none'}}></div>)
    }

    //TODO Добавить лоадер
    if (loading) return 'Loading'
    return(
        <div className={classes.CreateTasks__backdrop} onClick={backdropHandler}>
            <div className={classes.CreateTasks}>
                <h4>Создать задачу</h4>
                <Input
                    label="Заголовок"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Введите краткий заголовок задачи ..."
                    value={form.title}
                    onChange={changeHandler}
                />
                <TextArea
                    name="text"
                    id="text"
                    placeholder="Введите полное описание задачи..."
                    onChange={changeHandler}
                    value={form.text}
                />
                <div style={{display: "flex", flexDirection: "column", paddingTop: '20px', width: '100%'}}>
                <ComboBox
                    id="department"
                    label="Отдел"
                    name="department"
                    data={data.departments}
                    value={form.department}
                    onChange={changeHandler}
                />
                </div>
                <div style={{display: "flex", flexDirection: "column", paddingTop: '20px', width: '100%'}}>
                    <ComboBox
                        id="priority"
                        label="Приоритет"
                        name="priority"
                        data={[{id: 1, name: 'Низкий'}, {id: 2, name: 'Средний'}, {id: 3, name: 'Высокий'}]}
                        value={form.priority}
                        onChange={changeHandler}
                    />
                </div>
                <div className={classes.CreateTasks__buttonWrapper}>
                    <div className={classes.CreateTasks__button + ' ' + classes.CreateTasks__button_cancel} onClick={cancelHandler}>Отмена</div>
                    <div className={classes.CreateTasks__button + ' ' + classes.CreateTasks__button_success} onClick={successHandler}>Создать</div>
                </div>
            </div>
        </div>
    )
}