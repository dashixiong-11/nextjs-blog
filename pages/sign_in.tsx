import React, {useCallback, useState} from "react";
import {NextPage} from "next";
import axios, { AxiosResponse} from 'axios'


const SignIn: NextPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    })
    const [errors, setErrors] = useState({
        username: [], password: [], passwordConfirmation: []
    })
    const onSubmit = useCallback((e) => {
        e.preventDefault()
        axios.post('/api/v1/sessions', formData).then((
        ) => {
            window.alert('登录成功')
            // window.location.href = '/index'
        }, err => {
            if (err.response) {
                const response: AxiosResponse = err.response
                if (response.status === 422) {
                    setErrors(response.data)
                }
            }
        })
    }, [formData])

    return <>
        <h1>登录</h1>
        <form onSubmit={onSubmit}>
            <div>
                <label>用户名
                    <input type="text" value={formData.username}
                           onChange={e => setFormData({
                               ...formData,
                               username: e.target.value
                           })}/>
                </label>
                {errors.username?.length > 0 && errors.username.join('')}
            </div>
            <div>
                <label>密码
                    <input type="password" value={formData.password}
                           onChange={e => setFormData({
                               ...formData,
                               password: e.target.value
                           })}/>
                    {errors.password?.length > 0 && errors.password.join('')}
                </label>
            </div>
            <button type='submit'>登录</button>
        </form>
    </>
}

export default SignIn