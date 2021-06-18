import React from 'react'
import classes from './Input.module.css'

export const Input = (props) => {
    return(
        <>
            <label className={classes.Input__label} htmlFor={props.id}>{props.label}</label>
            <input
                className={classes.Input__input}
                type={props.type}
                id={props.id}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </>
    )
}