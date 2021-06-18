import React, {useCallback, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import classes from './StaffPage.module.css'
import { Link} from 'react-router-dom'
import {useQuery} from "@apollo/client";
import {GET_DEPARTMENTS, GET_DEPARTMENTS_WITH_STAFF} from "../../apollo/queries";
import {Department} from "../../components/Department/Department";
import {authVar} from "../../apollo/cache";


export const StaffPage = () => {
    const auth = authVar()
    const {loading, error, data} = useQuery(GET_DEPARTMENTS_WITH_STAFF, {fetchPolicy: 'network-only'})

    //TODO Сделать лоадер и обработку ошибки
    if (loading) return 'Loading'
    // if (error) return `Error! ${error.message}`;

    return(
        <>
            <Helmet>
                <title>👥 Сотрудники</title>
            </Helmet>
            <div className={classes.StaffPage}>
                    <h2>Сотрудники</h2>
                <div className={classes.StaffPage__wrapper}>
                    {auth.role === 'admin' && <Link to="/create/user" className={classes.StaffPage__button}>
                        <i className="fa fa-plus-circle" aria-hidden="true" style={{fontSize: '18px', marginRight: '7px'}}></i>
                        Создать сотрудника
                    </Link>}
                    {auth.role === 'admin' && <Link to='/create/department' className={classes.StaffPage__button}>
                        <i className="fa fa-plus-circle" aria-hidden="true" style={{fontSize: '18px', marginRight: '7px'}}></i>
                        Создать отдел
                    </Link>}





                    <div className={classes.StaffPage__departments}>
                        {data.departments.map((department) => (
                            <Department
                                key={department.id}
                                department={department}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}