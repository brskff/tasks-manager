import React, {useState} from 'react'

export const AuthPage = () => {
    const [form, setForm] = useState({
        email:'', password:''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            console.log('login')
        } catch (e) {

        }
    }

    return(
        <div>
                <div>
                    <input
                        type="text"
                        id="email"
                        placeholder="Введите email"
                        name="email"
                        value={form.email}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        placeholder="Введите Пароль"
                        name="password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                </div>
                <button
                    onClick={loginHandler}
                >
                    Войти
                </button>
        </div>
    )
}