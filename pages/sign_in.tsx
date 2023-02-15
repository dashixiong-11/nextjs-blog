import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import axios from 'axios'
import {User} from "../src/entity/User";
import theSession from "../lib/TheSession";
import {useForm} from "../hooks/useForm";
import {useToast} from "../hooks/useToast";
import {HeadCover} from "../components/HeadCover";
import qs from 'querystring'

const SignIn: NextPage<{ user: User }> = () => {
    const {form} = useForm()

    return <>
        <div className='sign-in'>
            {/*<HeadCover />*/}
            <div className='form-container'>
                {form}
            </div>
            <img className='right-side-cover' src="../loading.jpg" alt=""/>
        </div>
        <style jsx>
            {`
            .sign-in {
              display: flex;
            
            }
            .sign-in .right-side-cover {
              width:  45%;
              height: 100vh;
              object-fit: cover;
            }
            .form-container {
              flex-grow: 1;
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