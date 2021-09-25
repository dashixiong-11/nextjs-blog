import React from "react";
import {Post} from '../../src/entity/Post';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {GetServerSideProps, NextPage} from "next";
import Link from "next/link";

type Props = {
    post: Post
}
const BlogContent: NextPage<Props> = (props) => {
    const {post} = props
    return <>
        <div>文章详情</div>
        <div className='wrapper'>
            <h1>{post.title}</h1>
            <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
        </div>
        <article dangerouslySetInnerHTML={{__html: post.content}}>
        </article>
        <style jsx>{ `
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
          }
          .wrapper > button {
            
          }
` }</style>
    </>
}

export default BlogContent

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, context.params.id);
    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        }
    };
};
