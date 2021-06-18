import React, {useEffect, useState} from 'react'
import {Helmet} from "react-helmet";
import classes from './CreateUserPage.module.css'
import {Input} from "../../components/UI/Input/Input";
import {useHttp} from "../../hooks/http.hook";
import {useQuery} from "@apollo/client";
import {GET_DEPARTMENTS} from "../../apollo/queries";
import {ComboBox} from "../../components/UI/ComboBox/ComboBox";
import {useHistory} from "react-router-dom";

export const CreateUserPage = () => {
    const history = useHistory()
    const [form, setForm] = useState({
        email: '',
        password: '',
        rpassword: '',
        phone: '',
        birthday: '',
        position: '',
        fio: '',
        department: ''
    })
    const {loading, error, request, clearError} = useHttp()
    const departments = useQuery(GET_DEPARTMENTS, {fetchPolicy: 'network-only'})
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const clickHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            history.push('/staff')
        } catch (e) {

        }
    }


    //TODO Сделать лоадер
    if (departments.loading) return 'Loading'

    return(
        <>
            <Helmet>
                <title>Создать сотрудника</title>
            </Helmet>
            <div className={classes.CreateUserPage}>
                <h2>Создать сотрудника</h2>
                <div className={classes.CreateUserPage__wrapper}>
                    <div className={classes.CreateUserPage__input}>
                        <Input
                            label="ФИО"
                            id="fio"
                            name="fio"
                            type="text"
                            placeholder="Фамилия Имя Отчество"
                            value={form.fio}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={classes.CreateUserPage__input}>
                        <Input
                            label="Email"
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={form.email}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={classes.CreateUserPage__input}>
                        <Input
                            label="Пароль"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            value={form.password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={classes.CreateUserPage__input}>
                        <Input
                            label="Повторите пароль"
                            id="rpassword"
                            name="rpassword"
                            type="password"
                            placeholder="Повторите Пароль"
                            value={form.rpassword}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={classes.CreateUserPage__input}>
                        <Input
                            label="Телефон"
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Телефон"
                            value={form.phone}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={classes.CreateUserPage__input}>
                        <Input
                            label="День рождения"
                            id="birthday"
                            name="birthday"
                            type="text"
                            placeholder="День рождения"
                            value={form.birthday}
                            onChange={changeHandler}
                        />
                    </div>
                    <ComboBox
                        id="department"
                        label="Отдел"
                        name="department"
                        data={departments.data.departments}
                        value={form.department}
                        onChange={changeHandler}
                    />
                    <div className={classes.CreateUserPage__input}>
                        <Input
                            label="Должность"
                            id="position"
                            name="position"
                            type="text"
                            placeholder="Должность"
                            value={form.position}
                            onChange={changeHandler}
                        />
                    </div>
                    <button
                        className={classes.CreateUserPage__button}
                        onClick={clickHandler}
                    >
                        Создать
                    </button>
                </div>

            </div>
        </>
    )
}