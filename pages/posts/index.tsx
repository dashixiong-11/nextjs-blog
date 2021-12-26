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
import axios from "axios";
import {useRouter} from 'next/router';


type Props = {
    posts: Post[];
    count: number;
    perPage: number;
    page: number;
    totalPage: number;
    user: User
}
const PostsIndex: NextPage<Props> = (props) => {
    const router = useRouter()
    const {posts, page, totalPage, user} = props;
    const {pager} = usePager({page, totalPage});
    const deleteBlog = (id: number) => {
        axios.delete(`/api/v1/posts/${id}`).then(() => {
            window.alert('删除成功')
            router.push('/posts')
        }, () => {
            window.alert('删除失败')
        })
    }
    return <>
        <div className='posts'>
            <div className='nav'>
                {
                    user.username ?
                        <Link href='/posts/new' as={`/posts/new`}>
                            <a> 写博客 </a>
                        </Link> :
                        <Link href='/sign_in' as={`/sign_in`}>
                            <a> 登录 </a>
                        </Link>
                }
            </div>
            <ul> {posts.map(p => <li key={p.id}>
                <Link href='/posts/[id]' as={`/posts/${p.id}`}>
                    <a> {p.title} </a>
                </Link>
                <a onClick={() => deleteBlog(p.id)}>删除</a>
            </li>)} </ul>
                {pager}
        </div>
        <style jsx>
            {`
              .posts {
                min-height: 100vh;
                background: #f4f5f5;
                padding: 20px 10%;
              }
              .posts > .nav {
                text-align: end;
              }
              ul{
                padding: 0;
                margin: 1em 0 0; 
                display: flex;
                flex-direction: column;
                
              }
               ul > a{
                  border-bottom: 1px solid #999;
                  margin-top: 1em;
                  cursor: pointer;
                }
                ul > li {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 0.5em 0;
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
    const perPage = 2;
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