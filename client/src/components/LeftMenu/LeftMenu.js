import React from "react";
import {Link} from 'react-router-dom'
import classes from './LeftMenu.module.css'

export const LeftMenu = () => {

    return(
        <div className={classes.LeftMenu}>
            <div className={classes.Logo}>
                <img src="img/GMTblue.png" alt="logo"/>
                <Link to="/tasks">Задачи</Link>
                <Link to="/staff">Сотрудники</Link>
            </div>
        </div>
    )
}