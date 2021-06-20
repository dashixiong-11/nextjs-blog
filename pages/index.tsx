import React from "react";
import Head from 'next/head'
import mountain from 'assets/imgs/shan.jpeg'
import {UAParser} from 'ua-parser-js'
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "../lib/getDatabaseConnection";
import {Post} from "../src/entity/Post";

const index: NextPage<Props> = (props) => {
    const {posts} = props

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <img src={mountain} style={{width: '100%'}} alt=""/>
            </main>
            <ul> {posts.map(p => <li key={p.id}>{p.title}</li>)} </ul>
        </div>
    )
}
export default index

export const getServerSideProps: GetServerSideProps = async (context) => {
    const connection = await getDatabaseConnection()
    console.log(connection);
    const posts = await connection.manager.find(Post)
    console.log('posts');
    console.log(posts);
    const ua = context.req.headers['user-agent']
    const r = new UAParser(ua).getResult()
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        },
    }

}
