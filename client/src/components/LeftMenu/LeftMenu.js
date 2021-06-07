import React from "react";
import classes from './LeftMenu.module.css'

export const LeftMenu = () => {

    return(
        <div className={classes.LeftMenu}>
            <div className={classes.Logo}>
                <img src="img/GMTblue.png" alt="logo"/>
            </div>
        </div>
    )
}