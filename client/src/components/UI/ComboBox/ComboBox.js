import React from "react";
import classes from './ComboBox.module.css'

export const ComboBox = (props) => {
    return(
        <>
            <label htmlFor={props.id} className={classes.ComboBox__label}>{props.label}</label>
            <select className={classes.ComboBox__select} id={props.id} name={props.name} onChange={props.onChange} >
                <option disabled selected  value="">-</option>
                {props.data.map((option, index) => {
                    return (<option key={option.id} value={option.id}>{option.name}</option>)
                })}
            </select>
        </>

    )
}