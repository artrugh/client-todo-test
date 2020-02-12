import React, { useState, useEffect } from 'react';

import { login } from '../requests/fetchData'

const Login = props => {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [alarm, setAlarm] = useState("")

    const change = e => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const submit = async e => {
        e.preventDefault();

        // call the api
        const response = await login(userData);
        // if it succeeds
        if (response.status === 200) {
            localStorage.setItem('x-auth-token', response.data);
            props.history.push('/user')
        } else {
            // if not sent a messege to the user
            setAlarm(response)
        }
    }

    useEffect(() => {
        document.title = `TodoApp-login`;
    }, []);

    return (
        <section className="home">
            <div className="sign-container">
            <i className="fas fa-chevron-left" onClick={() => props.history.push('/')}></i>
                <form onSubmit={e => submit(e)} className="sign-form">
                    <h3 className="contact-title">Log in!</h3>
                    <input className="form-control"
                        placeholder="email"
                        type="text"
                        name="email"
                        onChange={e => change(e)}
                        value={userData.email} />
                    <input className="form-control" placeholder="password" type="password" name="password" onChange={e => change(e)} value={userData.password} />
                    <p className="alert">{alarm}</p>
                    <button type="submit" value="Send" className="sign-button">log in</button>
                </form>
            </div>
        </section>
    )
}

export default Login;