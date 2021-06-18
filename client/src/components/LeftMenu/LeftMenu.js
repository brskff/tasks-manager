import React, {useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom'
import classes from './LeftMenu.module.css'
import {LeftMenuItem} from "./LeftMenuItem/LeftMenuItem";
import {authVar} from "../../apollo/cache";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../../apollo/queries";

export const LeftMenu = () => {
    const auth = authVar()
    const {loading, error, data} = useQuery(GET_USER, {variables: {id: auth.userId}})
    const history = useHistory()
    const [activeItem, setActiveItem] = useState(history.location.pathname)

    const leftMenuItemHandler = (path) => {
        setActiveItem(path)
    }

    useEffect(() => {
        leftMenuItemHandler(history.location.pathname)
    },[])

    if (loading) return 'Loading'
    console.log(data)
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
                    title='Согласование'
                    link='/agreement'
                    icon='fa fa-thumbs-o-up'
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
            <div className={classes.LeftMenu__userWrapper}>
                <div className={classes.LeftMenu__user}>{data.user.fio}</div>
                <div className={classes.LeftMenu__userButton}>Выход</div>
            </div>
        </div>
    )
}