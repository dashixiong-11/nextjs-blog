import React, {useCallback, useState} from "react";
import {NextPage} from "next";
import axios, {AxiosError, AxiosResponse} from 'axios'


const SignUp: NextPage = () => {
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
        axios.post('/api/v1/users', formData).then(() => {
        }, err => {
            if (err.response) {
                const response: AxiosResponse = err.response
                if (response.status === 422) {
                    setErrors({...errors, ...response.data})
                }
            }
            console.log(err.response);
        })
    }, [formData])

    return <>
        <h1>注册</h1>
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
            <div>
                <label>确认密码
                    <input type="password" value={formData.passwordConfirmation}
                           onChange={e => setFormData({
                               ...formData,
                               passwordConfirmation: e.target.value
                           })}/>
                    {errors.passwordConfirmation?.length > 0 && errors.passwordConfirmation.join('')}
                </label>
            </div>
            <button type='submit'>注册</button>
        </form>
    </>
}

export default SignUp