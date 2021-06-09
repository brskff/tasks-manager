import React from 'react'
import {Helmet} from "react-helmet";
import classes from './CreateUserPage.module.css'

export const CreateUserPage = () => {
    return(
        <>
            <Helmet>
                <title>Создать сотрудника</title>
            </Helmet>
            <div className={classes.CreateUserPage}>
                <h2>Создать сотрудника</h2>
                <div>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                    />
                </div>
                <div>
                    <input
                        id="rpassword"
                        name="rpassword"
                        type="password"
                        placeholder="Повторите Пароль"
                    />
                </div>
                <div>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Телефон"
                    />
                </div>
                <div>
                    <input
                        id="birthday"
                        name="birthday"
                        type="text"
                        placeholder="День рождения"
                    />
                </div>
                    {/*TODO Вывести отделы */}
                <div>
                    <input
                        id="position"
                        name="position"
                        type="text"
                        placeholder="Должность"
                    />
                </div>
            </div>
        </>
    )
}