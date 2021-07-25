import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import axios from 'axios'
import {User} from "../src/entity/User";
import theSession from "../lib/TheSession";
import {useForm} from "../hooks/useForm";
import qs from 'querystring'
import Link from "next/link";


const SignIn: NextPage<{ user: User }> = (props) => {
    const {form} = useForm({
        initFormData: {username: '', password: ''},
        fields: [{label: '用户名', type: 'text', key: 'username'},
            {label: '密码', type: 'password', key: 'password'}],
        buttons: <button type="submit">提交</button>,
        submit: {
            request: formData => axios.post('/api/v1/sessions', formData),
            successCallback: () => {
                window.alert('登录成功')
                const query = qs.parse(window.location.search.substring(1))
                window.location.href = query.return_to.toString()
            }
        }
    })

    return <>
        <h1>登录</h1>
        当前登录用户：{props.user.username}
        {form}
        <p className='link'><Link href="/sign_up"><a>去注册</a></Link></p>
    </>
}

export default SignIn

export const getServerSideProps: GetServerSideProps = theSession(async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    return {
        props: {
            user: JSON.parse(JSON.stringify(user || ''))
        }
    };
});