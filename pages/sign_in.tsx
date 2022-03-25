import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import axios from 'axios'
import {User} from "../src/entity/User";
import theSession from "../lib/TheSession";
import {useForm} from "../hooks/useForm";
import {useToast} from "../hooks/useToast";
import qs from 'querystring'
import Link from "next/link";

const SignIn: NextPage<{ user: User }> = (props) => {
    const {view, info} = useToast(1500)
    const {form} = useForm({
        initFormData: {username: '', password: ''},
        fields: [{label: '用户名', type: 'text', key: 'username'},
            {label: '密码', type: 'password', key: 'password'}],
        buttons: <button style={{border:"none",background:"none"}} className='sign-button' type="submit">登录</button>,
        submit: {
            request: formData => axios.post('/api/v1/sessions', formData),
            successCallback: () => {
                info('登录成功!', () => {
                    const query = qs.parse(window.location.search.substring(1))
                    window.location.href = '/posts'
                })
            }
        }
    })

    return <>
        <div className='sign-in'>
            {form}
            {view}
        </div>
        <style jsx>
            {`
            .sign-in {
              display: flex;
              justify-content: center;
              padding-top: 20%;
            }
`}
        </style>
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