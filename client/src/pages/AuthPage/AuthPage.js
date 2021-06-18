import React, {useEffect, useState} from 'react'
import {Helmet} from 'react-helmet'
import classes from './AuthPage.module.css'
import {authVar} from '../../apollo/cache'
import {useHttp} from "../../hooks/http.hook";
import {Input} from "../../components/UI/Input/Input";

export const AuthPage = () => {
    const auth = authVar()
    //TODO Добавить сообщения об ошибке
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'', password:''
    })
    const [leftSideOpacity, setLeftSideOpacity] = useState(0)

    useEffect(() => {
        setLeftSideOpacity(1)
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST',  {...form})
            auth.login(data.token, data.userId, data.role)
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <>
            <Helmet>
                <title>👋 Авторизация</title>
            </Helmet>
            <div className={classes.AuthPage}>
                <div className={classes.LeftSide}>
                    <div className={classes.LeftSide__wrapper} style={{opacity: leftSideOpacity}}>
                        <div className={classes.LeftSide__logo}>
                            <img src="img/GMTauth.png" alt="authlogo"/>
                        </div>
                        <h2>Добро пожаловать в СУЗ.</h2>
                        <h4>Введите свои данные чтобы продолжить.</h4>
                        <div className={classes.AuthInput}>
                            <Input
                                type="text"
                                label="Email"
                                id="email"
                                placeholder="Введите Email"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}
                            />
                            {form.email === '' ? <i className="fa fa-envelope-open-o" aria-hidden="true"></i>
                            : <i className="fa fa-envelope-open-o" aria-hidden="true" style={{color: '#1C1D21'}}></i>
                            }
                        </div>
                        <div className={classes.AuthInput}>
                            <Input
                                label="Пароль"
                                type="password"
                                id="password"
                                placeholder="Начните вводить ..."
                                name="password"
                                value={form.password}
                                onChange={changeHandler}
                            />
                            {form.password === '' ? <i className="fa fa-lock" aria-hidden="true"></i>
                                : <i className="fa fa-lock" aria-hidden="true" style={{color: '#1C1D21'}}></i>
                            }
                        </div>
                        <button
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                    </div>
                </div>
                <div className={classes.RightSide}>
                    <img src="img/authbg.png" alt="authbg"/>
                </div>
            </div>
        </>
    )
}