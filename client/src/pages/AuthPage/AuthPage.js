import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import classes from './AuthPage.module.css'

export const AuthPage = () => {
    const [form, setForm] = useState({
        email:'', password:''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            console.log('login')
        } catch (e) {

        }
    }

    return(
        <>
            <Helmet>
                <title>👋 Авторизация</title>
            </Helmet>
            <div className={classes.AuthPage}>
                <div className={classes.LeftSide}>
                    <div className={classes.LeftSide__wrapper}>
                        <div>
                            <input
                                type="text"
                                id="email"
                                placeholder="Введите email"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Начните вводить ..."
                                name="password"
                                value={form.password}
                                onChange={changeHandler}
                            />
                        </div>
                        <button
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                    </div>
                </div>
                <div className={classes.RightSide}></div>
            </div>
        </>
    )
}