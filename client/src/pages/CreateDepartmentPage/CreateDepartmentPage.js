import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet} from "react-helmet";
import classes from './CreateDepartmentPage.module.css'
import {Input} from "../../components/UI/Input/Input";
import {useMutation} from "@apollo/client";
import {ADD_DEPARTMENT} from "../../apollo/mutations";

export const CreateDepartmentPage = () => {
    const [addDepartment] = useMutation(ADD_DEPARTMENT)
    const [name, setName] = useState('')
    const history = useHistory()

    const changeHandler = event => {
        setName(event.target.value)
    }

    const clickHandler = event => {
        event.preventDefault()
        if (name === '') {
            return console.log('hi')//TODO Вывести ошибку что пустое поле
        }

        addDepartment({variables: {name}})
        history.push('/staff')
    }

    return(
        <>
            <Helmet>
                <title>Создать отдел</title>
            </Helmet>
            <div className={classes.CreateDepartmentPage}>
                <h2>Создать отдел</h2>
                <div className={classes.CreateDepartmentPage__wrapper}>
                    <div className={classes.CreateDepartmentPage__input}>
                        <Input
                            label="Название отдела"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Название отдела"
                            value={name}
                            onChange={changeHandler}
                        />
                    </div>
                    <button
                        className={classes.CreateDepartmentPage__button}
                        onClick={clickHandler}
                    >
                        Создать
                    </button>
                </div>
            </div>
        </>
    )
}