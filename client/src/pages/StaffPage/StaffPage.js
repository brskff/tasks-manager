import React from 'react'
import {Helmet} from 'react-helmet'
import classes from './StaffPage.module.css'
import {useHistory} from 'react-router-dom'

export const StaffPage = () => {
    const history = useHistory()

    const createUserHandler = () => {
        history.push('/create/user')
    }
    const createDepartmentHandler = () => {
        history.push('/create/department')
    }

    return(
        <>
            <Helmet>
                <title>👥 Сотрудники</title>
            </Helmet>
            <div className={classes.StaffPage}>
                <h1>Сотрудники</h1>
                <button
                    onClick={createUserHandler}
                >Создать сотрудника</button>
                <button
                    onClick={createDepartmentHandler}
                >Создать отдел</button>
            </div>

        </>
    )
}