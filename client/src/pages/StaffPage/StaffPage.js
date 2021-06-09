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
                    <h2>Сотрудники</h2>
                <div className={classes.StaffPage__wrapper}>
                    <button
                        onClick={createUserHandler}
                    >
                        <i className="fa fa-plus-circle" aria-hidden="true" style={{fontSize: '18px', marginRight: '7px'}}></i>
                        Создать сотрудника
                    </button>
                    <button
                        onClick={createDepartmentHandler}
                    >
                        <i className="fa fa-plus-circle" aria-hidden="true" style={{fontSize: '18px', marginRight: '7px'}}></i>
                        Создать отдел
                    </button>
                </div>
            </div>

        </>
    )
}