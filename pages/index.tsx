import React from "react";
import Head from 'next/head'
import mountain from 'assets/imgs/shan.jpeg'
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "../lib/getDatabaseConnection";
import {Post} from "../src/entity/Post";
import Link from "next/link";

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
            <ul> {posts.map(p => <Link key={p.id} href={`/blog/${p.id}`}>
                <a> {p.title}   </a>
            </Link>)} </ul>
        </div>
    )
}
export default index

export const getServerSideProps: GetServerSideProps = async () => {
    const connection = await getDatabaseConnection()
    const posts = await connection.manager.find(Post)
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        },
    }

}
