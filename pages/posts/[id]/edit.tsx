import {GetServerSideProps, NextPage} from "next";
import React from "react";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {Post} from "../../../src/entity/Post";
import {useEditor} from "../../../hooks/useEditor";

type Props = {
    id: number,
    post: Post
}
const PostsEdit: NextPage<Props> = (props) => {
    const {id, post} = props
    const {Editor} = useEditor({
        method: 'patch', path: `/api/v1/posts/${id}`,
        title: post.title, content: post.content, id: id
    })

    return <>
        {Editor}
    </>
}

export default PostsEdit

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.params
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne('Post', id);
    return {
        props: {
            id: parseInt(id.toString()),
            post: JSON.parse(JSON.stringify(post))
        }
    }

}