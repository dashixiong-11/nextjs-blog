import {GetServerSideProps, NextPage} from "next";
import React from "react";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {Post} from "../../../src/entity/Post";
import dynamic from "next/dynamic";

const MilkDown = dynamic(() => import('../../../components/MilkDown/MilkDown'), {ssr: false})

type Props = {
    id: number,
    post: Post
}
const PostsEdit: NextPage<Props> = (props) => {
    const {id, post} = props
    return <>
        <MilkDown defaultContent={post.content} id={id} defaultTitle={post.title}/>
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