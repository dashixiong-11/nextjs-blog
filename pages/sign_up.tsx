import React from "react";
import {NextPage} from "next";
import axios from 'axios'
import {useForm} from "../hooks/useForm";


const SignUp: NextPage = () => {
    const {form} = useForm({
        initFormData: {username: '', password: '', passwordConfirmation: ''},
        fields: [{label: '用户名', type: 'text', key: 'username'},
            {label: '密码', type: 'password', key: 'password'},
            {label: '确认密码', type: 'password', key: 'passwordConfirmation'},],
        buttons: <button type="submit">提交</button>,
        submit: {
            request: formData => axios.post('/api/v1/users', formData),
            successCallback: () => {
                window.alert('注册成功')
                window.location.href = '/sign_in'
            }
        }
    })

    return <>
        <h1>注册</h1>
        {form}
    </>
}

export default SignUp