import React from "react";
import Head from 'next/head'
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from "../lib/getDatabaseConnection";
import {Post} from "../src/entity/Post";
import Link from "next/link";
import qs from 'querystring'
import {usePager} from "../hooks/usePager";

const index: NextPage<Props> = (props) => {
    const {posts, count, page, totalPage} = props
    const {pager} = usePager({count, page, totalPage})

    return <>
        <div>
            <div>
                <Head>
                    <title>Create Next App</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <div className='blog-name'>awat</div>
            </div>
            {pager}
            <ul> {posts.map(p => <Link key={p.id} href={`/blog/${p.id}`}>
                <a> {p.title}   </a>
            </Link>)} </ul>
        </div>
        <style jsx>
            {`
  .banner-wrapper{
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center; 
    overflow: hidden;
  }
  .blog-name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 70px;
  color: #fff;
  height: 300px;
  position: relative;
  cursor: pointer;
  }
  .blog-name:before{
  background-image: url('/shan.jpeg');
  background-size:cover;
  background-position-y:center;
  background-position-x:center;
  background-repeat: no-repeat;
  position: absolute;
  content: '';
  z-index: -1;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  filter: blur(2px);
  }
`}

        </style>
    </>
}
export default index

export const getServerSideProps: GetServerSideProps = async (context) => {
    const index = context.req.url.indexOf('?')
    const search = context.req.url.substring(index + 1)
    const query = qs.parse(search)
    const page = parseInt((query.page || 1).toString()) || 1
    const connection = await getDatabaseConnection()
    const perPage = 1
    const [posts, count] = await connection.manager.findAndCount(Post, {skip: (page - 1) * perPage, take: perPage})
    console.log(query);
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            page, count: count, perPage, totalPage: Math.ceil(count / perPage)
        },
    }

}
