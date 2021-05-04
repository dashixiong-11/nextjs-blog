import React from "react";
import {getPost, getPostIds} from "../../lib/getPosts";
import {NextPage} from "next";

type Props = {
    post: Post
}
const BlogContent: NextPage<Props> = (props) => {
    const {post} = props
    return <>
        <div>文章详情</div>
        <h1>{post.title}</h1>
        <article dangerouslySetInnerHTML={{__html:post.htmlContent}}>
        </article>
    </>
}

export default BlogContent

export const getStaticPaths = async () => {
    const idList = await getPostIds()
    return {
        paths: idList.map(id => ({params: {id: id}})),
        fallback: false
    }
}
export const getStaticProps = async (x: any) => {

    const id = x.params.id
    console.log('id', id);
    const post = await getPost(id)
    return {
        props: {
            post: post
        }
    }
}
