import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import {usePager} from '../../hooks/usePager';
import React, {useEffect} from "react";
import theSession from "../../lib/TheSession";
import {User} from "../../src/entity/User";


type Props = {
    posts: Post[];
    count: number;
    perPage: number;
    page: number;
    totalPage: number;
    user: User
}
const PostsIndex: NextPage<Props> = (props) => {
    const {posts, page, totalPage, user} = props;
    const {pager} = usePager({page, totalPage});
    const formatTime = (date: Date) => {
        // return date
        return new Date(+new Date(date) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        // return new Date('2022-03-26T02:34:54.096Z')
    }
    return <>
        <div className='posts'>
            <div className='nav'>
                {/*
                {user.username &&
                <Link href='/posts/new' as={`/posts/new`}>
                    <a> 写博客 </a>
                </Link>}
*/}
            </div>
            <div className='add-blog'>
                {user.username &&
                <Link href='/posts/new' as={`/posts/new`}>
                    <a> New </a>
                </Link>}
            </div>
            <ul> {posts.map(p => <li key={p.id}>
                <Link href='/posts/[id]' as={`/posts/${p.id}`}>
                    <div>
                        <a> {p.title} </a>
                        <span> {formatTime(p.updatedAt)} </span>
                    </div>
                </Link>

                {/*<a onClick={() => deleteBlog(p.id)}>删除</a>*/}
            </li>)} </ul>
            {pager}
        </div>
        <style jsx>
            {`
              .posts {
                min-height: 100vh;
              }
              .posts > .add-blog {
                padding: 1em 2em;
                text-align: end;
              }
              .posts > .nav {
                background: url('../loading.jpg') no-repeat center center/cover;
                padding: 80px 0;
              }
              ul{
                padding: 20px 10%;
                margin: 1em 0 0; 
                display: flex;
                flex-direction: column;
                
              }
                ul > li {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 10px 2em;
                  margin-top: 1em;
                  cursor: pointer;
                }
                ul > li > div  {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  width: 100%;
                }
                ul > li > div > a {
                  font-weight: bold;
                }
                ul > li > div > span {
                  font-size: 12px;
                  color: #999;
                }
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
`}

        </style>
    </>
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = theSession(async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    const index = context.req.url.indexOf('?');
    const search = context.req.url.substr(index + 1);
    const query = qs.parse(search);
    const page = parseInt(query.page?.toString()) || 1;
    const connection = await getDatabaseConnection();// 第一次链接能不能用 get
    const perPage = 10;
    const [posts, count] = await connection.manager.findAndCount(Post, {
        skip: (page - 1) * perPage,
        take: perPage,
        order: {id: 'ASC'}
    });
    return {
        props: {
            user: JSON.parse(JSON.stringify(user || '')),
            posts: JSON.parse(JSON.stringify(posts)),
            count: count,
            perPage, page,
            totalPage: Math.ceil(count / perPage)
        }
    };
})