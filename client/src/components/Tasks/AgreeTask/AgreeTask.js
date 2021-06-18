import React, {useState} from "react";
import classes from './AgreeTask.module.css'
import {ComboBox} from "../../UI/ComboBox/ComboBox";

export const AgreeTask = () => {
    const [executor, setExecutor] = useState('')

    const fakeData = [{id: 1,name: 'Барсуков Александр Борисович'}
    ]

    return (
        <div className={classes.AgreeTask__backdrop}>
            <div className={classes.AgreeTask}>
                <h4>Согласовать задачу</h4>
                 <div className={classes.AgreeTask__title}>
                     Печатная форма для квартального отчета
                 </div>
                <p style={{marginBottom: '20px'}}>Необходимо разработать новую печатную форму для квартального отчета. Макет печатной формы вышлю конечному исполнителю на почту.  </p>
                <div>От: Рыбкин Сергей Денесивоич<br /> Отдел: Финансовый отдел</div>
                <div style={{display:"flex", flexDirection: 'column', marginTop: '20px'}}>
                    <ComboBox
                        id="executor"
                        label="Исполнитель"
                        name="executor"
                        data={fakeData}
                        value={executor}
                        // onChange={changeHandler}
                    />
                </div>
                <div className={classes.AgreeTask__buttonWrapper}>
                    <div className={classes.AgreeTask__button + ' ' + classes.AgreeTask__button_cancel} >Отмена</div>
                    <div className={classes.AgreeTask__button + ' ' + classes.AgreeTask__button_warning} >Согласовать с куратором</div>
                    <div className={classes.AgreeTask__button + ' ' + classes.AgreeTask__button_success} >Подтвердить</div>
                </div>

            </div>
        </div>
    )
}