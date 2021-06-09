import React from 'react'
import {Helmet} from "react-helmet";
import classes from './CreateDepartmentPage.module.css'

export const CreateDepartmentPage = () => {
    return(
        <>
            <Helmet>
                <title>Создать отдел</title>
            </Helmet>
            <div className={classes.CreateDepartmentPage}>
                <h2>Создать отдел</h2>
            </div>
        </>
    )
}