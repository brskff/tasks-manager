import React, {useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom'
import classes from './LeftMenu.module.css'
import {LeftMenuItem} from "./LeftMenuItem/LeftMenuItem";

export const LeftMenu = () => {
    const history = useHistory()
    const [activeItem, setActiveItem] = useState(history.location.pathname)

    const leftMenuItemHandler = (path) => {
        setActiveItem(path)
    }



    return(
        <div className={classes.LeftMenu}>
            <div className={classes.Logo}>
                <img src="img/GMTblue.png" alt="logo"/>
            </div>
            <div className={classes.LeftMenu__menu}>
                <LeftMenuItem
                    title='Задачи'
                    link='/tasks'
                    icon='fa fa-calendar-check-o'
                    onClickHandler={leftMenuItemHandler}
                    active={activeItem}
                />
                <LeftMenuItem
                    title='Сотрудники'
                    link='/staff'
                    icon='fa fa-user'
                    onClickHandler={leftMenuItemHandler}
                    active={activeItem}
                />
            </div>
        </div>
    )
}