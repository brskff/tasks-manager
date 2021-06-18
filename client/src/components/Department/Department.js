import React from "react";
import classes from './Department.module.css'
import {authVar} from "../../apollo/cache";
import {Link} from "react-router-dom";

export const Department = (props) => {
    const auth = authVar()

    const updateUserHandler = event => {
        if (auth.role === 'admin') {
            console.log('admin')
        }
    }



    return(
        <div >
            <div>
                <div className={classes.DepartmentName}>{props.department.name} {auth.role === 'admin' &&
                <Link to={`/update/department/${props.department.id}`}><i className="fa fa-pencil" aria-hidden="true" style={{cursor: "pointer"}} ></i></Link> }</div>
                {/*{props.department.curator && <div>Куратор: </div>}*/}
            </div>
            <div className={classes.Department__wrapper}>

                <div className={classes.Department__item}>
                    <div style={{fontSize: '16px', fontWeight: '700'}}>ФИО</div>
                    <div style={{fontSize: '16px', fontWeight: '700'}}>Должность</div>
                    <div style={{fontSize: '16px', fontWeight: '700'}}>Телефон</div>
                    <div style={{fontSize: '16px', fontWeight: '700'}}>Дата Рождения</div>
                </div>
                {props.department.staff.map((user) => (
                    <div
                        className={classes.Department__item} key={user.id}
                        onClick={updateUserHandler}
                    >
                        <div>{user.fio}</div>
                        <div>{user.position}</div>
                        <div>{user.phone}</div>
                        <div>{user.birthday}</div>
                    </div>
                ))}
            </div>
        </div>
        )
}