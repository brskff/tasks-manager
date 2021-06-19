import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {Helmet} from "react-helmet";
import classes from './UpdateDepartmentPage.module.css'
import {Input} from "../../components/UI/Input/Input";
import {useMutation, useQuery} from "@apollo/client";
import {GET_DEPARTMENT_WITH_STAFF_AND_CURATORS} from "../../apollo/queries";
import {ComboBox} from "../../components/UI/ComboBox/ComboBox";
import {UPDATE_DEPARTMENT} from "../../apollo/mutations";

export const UpdateDepartmentPage = (props) => {
    const [form, setForm] = useState({
        name: '',
        staff: [],
        curators: [],
        chief: '',
        curator: '',
    })
    const departmentId = useParams().id
    const {loading, error,data} = useQuery(GET_DEPARTMENT_WITH_STAFF_AND_CURATORS, {variables:{id: departmentId}})
    const [updateDepartment] = useMutation(UPDATE_DEPARTMENT)

    useEffect(() => {

        if (data) {
            setForm({...form, name: data.department.name, chief: data.department.chief ? {id: data.department.chief.id, name: data.department.chief.name} : {id: '', name: ''}, staff: data.department.staff.map(candidate =>  ({id: candidate.id, name:candidate.fio})), curators: data.department.curators.map(curator =>  ({id: curator.id, name:curator.fio}))})
        }
    }, [loading, data])


    //TODO Добавить лоадер
    if (loading) return 'Loading'



    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const selectHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const clickHandler = () => {
        updateDepartment({variables: {
                id: departmentId,
                name: form.name,
                curator: form.curator,
                chief: form.chief
            }})

    }

    return(
        <>
            <Helmet>
                <title>Изменить отдел</title>
            </Helmet>
            <div className={classes.UpdateDepartmentPage}>
                <h2>Изменить отдел {`- ${data.department.name}`}</h2>
                <div className={classes.UpdateDepartmentPage__wrapper}>
                    <div className={classes.UpdateDepartmentPage__input}>
                        <Input
                            label="Название отдела"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Название отдела"
                            value={form.name}
                            onChange={changeHandler}
                        />
                    </div>
                    <ComboBox
                        id="chief"
                        label="Начальник отдела"
                        name="chief"
                        data={form.staff}
                        value={form.chief}
                        onChange={selectHandler}
                    />
                    <ComboBox
                        id="curator"
                        label="Куратор отдела"
                        name="curator"
                        data={form.curators}
                        value={form.curator}
                        onChange={selectHandler}
                    />
                    <button
                        className={classes.UpdateDepartmentPage__button}
                        onClick={clickHandler}
                    >
                        Изменить
                    </button>
                </div>
            </div>
        </>
    )
}