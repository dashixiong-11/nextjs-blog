import React, {MouseEvent, MouseEventHandler, ReactChild, useCallback, useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useToast} from "./useToast";

type Field = {
    label: string,
    type: keyof FormDataType,
    key: keyof FormDataType,
    placeholder: string
}
type Fields = Field[]
type useType = 'sign' | 'register'
type FormDataType = {
    username: string,
    password: string,
    passwordConfirmation: string
}

export function useForm() {

    const {view, info} = useToast(1500)
    const [type, setType] = useState<useType>('sign')
    const [formData, setFormData] = useState<FormDataType>({username: 'dashixiong11', password: '123123', passwordConfirmation: ''})
    const [fields, setFields] = useState<Fields>([
            {label: '用户名', type: 'username', key: 'username', placeholder: '请输入用户名'},
            {label: '密码', type: 'password', key: 'password', placeholder: '请输入密码'},
            {label: '确认密码', type: 'password', key: 'passwordConfirmation', placeholder: '请确认密码'}
        ]
    )
    /*
        const [errors, setErrors] = useState(() => {
             const err: { [key in keyof FormDataType]?:string[] } = {}
             for (let key in formData) {
                  if (formData.hasOwnProperty(key)) {
                      e[key] = []
                  }
             }
             return err
        })
    */
    const [errors, setErrors] = useState<{ [key in keyof FormDataType]: string[] }>({
        username: [],
        password: [],
        passwordConfirmation: [],
    })
    const onChange = useCallback((key: keyof FormDataType, value: any) => {
        setFormData({...formData, [key]: value})
    }, [formData])

    useEffect(()=>{
        setFormData({username:'',password:'',passwordConfirmation:''})
        setErrors({
            username: [],
            password: [],
            passwordConfirmation: [],
        })
    },[type])

    const errorHandle = (error: any) => {
        if (error.response) {
            const response: AxiosResponse = error.response;
            if (response.status === 422) {
                setErrors(response.data);
            } else if (response.status === 401) {

                info('请先登录', () => {
                    window.location.href = '/sign_in?return_to=' + encodeURIComponent(window.location.pathname)
                })
            }
        }
    }
    const onSign = (e: MouseEvent) => {
        e.preventDefault();
        axios.post('/api/v1/sessions', formData).then(() => {
            window.location.href = '/posts'
        }, error => errorHandle(error))
    }
    const onToRegister = (e: MouseEvent) => {
        e.preventDefault();
        setType('register')
    }
    const onToSign = (e: MouseEvent) => {
        e.preventDefault();
        setType('sign')
    }
    const onRegister = (e: MouseEvent) => {
        e.preventDefault();
        axios.post('/api/v1/users', formData).then(() => {
            info('注册成功', () => setType('sign'))
        }, error => errorHandle(error))
    }

    const form = <>
        {view}
        <form>
            {type === 'sign' ? <h1>登录</h1> : <h1>注册</h1>}
            {fields.map(field =>
                (type === 'sign' && field.key === 'passwordConfirmation') ? null : <div key={field.key.toString()}>
                    <label>
                        <div className='title'>
                            {field.label}
                        </div>
                        <input placeholder={field.placeholder} type={field.type} value={formData[field.key].toString()}
                               onChange={(e) => onChange(field.key, e.target.value)}/>
                    </label>
                    {<div className='error-view'>
                        {errors[field.key]?.join(',')}
                    </div>}
                </div>
            )}
            <div className='buttons'>
                {type === 'sign' ?
                    <>
                        <button className='main-button' onClick={onSign}>登录</button>
                        <button className='minor-button' onClick={onToRegister}>去注册</button>
                    </> : <>
                        <button className='main-button' onClick={onRegister}>注册</button>
                        <button className='minor-button' onClick={onToSign}>去登录</button>
                    </>
                }
            </div>
        </form>
        <style jsx>
            {`
              form {
                padding: 20% 20%;
              }

              form h1 {
                padding-bottom: 5px;
              }

              form > div {
                padding-bottom: 1.5em;
              }

              form > div > label {
                display: flex;
                color: #999;
                border: 1px solid #d3d3d3;
                border-radius: 10px;
                padding: 6px 15px;
                display: flex;
                flex-direction: column;
              }

              form > div > label > input {
                padding: 5px 0;
                background: none;
                color: #333;
              }

              input::placeholder {
                font-size: 11px;
                color: #b7b7b7;
              }

              form .error-view {
                font-size: 12px;
                color: red;
                padding: 5px 15px;
                min-height: 1.5em;
              }

              form .buttons {
                display: flex;
                flex-direction: column;
                margin-top: 80px;
              }

              form .buttons button {
                background: none;
                border: none;
                color: #647479;
              }

              form .buttons .main-button {
                background: #333;
                color: #fff;
                padding: 8px 0;
                border-radius: 8px;
              }

              form .buttons .minor-button {
                margin-top: 2.5em;
              }
            `}
        </style>
    </>
    return {
        form
    }

}