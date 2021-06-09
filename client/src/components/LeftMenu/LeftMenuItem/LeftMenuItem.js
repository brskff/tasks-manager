import React, {useEffect} from "react";
import {NavLink} from 'react-router-dom'
import classes from './LeftMenuItem.module.css'

export const LeftMenuItem = (props) => {

    const navLinkHandler = () => {
        props.onClickHandler(props.link)
    }

    return(
        <div className={ props.active == props.link ? classes.LeftMenuItem + ' ' + classes.LeftMenuItem_active : classes.LeftMenuItem}>
            <NavLink to={props.link} onClick={navLinkHandler}><i className={props.icon} aria-hidden="true"></i>{props.title}</NavLink>
        </div>
    )
}