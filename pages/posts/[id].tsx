import React from "react";
import {getPost, getPostIds} from "../../lib/getPosts";
import {Post} from '../../src/entity/Post';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {GetServerSideProps, NextPage} from "next";

type Props = {
    post: Post
}
const BlogContent: NextPage<Props> = (props) => {
    const {post} = props
    return <>
        <div>文章详情</div>
        <h1>{post.title}</h1>
        <article dangerouslySetInnerHTML={{__html: post.content}}>
        </article>
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
