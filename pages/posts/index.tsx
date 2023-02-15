import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import {usePager} from '../../hooks/usePager';
import React, {useEffect} from "react";
import theSession from "../../lib/TheSession";
import {User} from "../../src/entity/User";
import {HeadCover} from "../../components/HeadCover";
import {SideCover} from "../../components/SideCover";
import {Layout} from "../../components/Layout";


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
            <HeadCover username={props.user && props.user.username}/>
            <Layout>
                <div className='wrapper'>
                    {
                        (posts && posts.length >0) ?
                            <ul> {posts.map(p => <li key={p.id}>
                                <Link href='/posts/[id]' as={`/posts/${p.id}`}>
                                    <a>
                                        <div className="title">
                                            {p.title}
                                        </div>
                                        <span> {formatTime(p.updatedAt)} </span>
                                    </a>
                                </Link>
                                {/*<a onClick={() => deleteBlog(p.id)}>删除</a>*/}
                            </li>)} </ul>: <div className="empty">
                                <span>你还没有发表过任何博客</span>
                                {/*{props.user && props.user.username ?*/}
                                {/*    <button>*/}
                                {/*        <Link href='/posts/new' as={`/posts/new`}>*/}
                                {/*                <a> 写博客 </a>*/}
                                {/*        </Link>*/}
                                {/*    </button>: <button>*/}
                                {/*        <Link href='/sign_in' as={`/sign_in`}>*/}
                                {/*            <a> 登录 </a>*/}
                                {/*        </Link>*/}
                                {/*    </button>*/}
                                {/*}*/}
                            </div>
                    }
                    {pager}
                </div>
            </Layout>
        </div>
        <style jsx>
            {`
              .posts {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
              }

              .posts > .add-blog {
                padding: 1em 2em;
                text-align: end;
              }

              ul {
                display: flex;
                flex-direction: column;
                overflow: scroll;
                width: 100%;
                padding: 20px;
              }
              .right-side .empty {
                color: #999;
              }
               .right-side .empty button {
                  border: none;
                  line-height: 36px;
                  color: #fff;
                  padding: 0 1.5em;
                  border-radius: 18px;
                  background: #333;
              }

              ul > li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
              }

              ul > li >  a {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: bold;
                width: 100%;
              }
              ul > li > a > .title{
                  width: 10em;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
              }

              ul > li > a > span {
                font-size: 12px;
                color: #999;
              }

              .banner-wrapper {
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
    </>;
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