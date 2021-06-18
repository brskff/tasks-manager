import React from "react";
import classes from './TextArea.module.css'

export const TextArea = (props) => {

    return(
        <textarea
            name={props.name}
            id={props.id}
            className={classes.TextArea}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    )
}