import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import dynamic from 'next/dynamic'
import {Layout} from "../../components/Layout";
import {HeadCover} from "../../components/HeadCover";
import theSession from "../../lib/TheSession";
import {Post} from "../../src/entity/Post";
import {User} from "../../src/entity/User";
import {Comment} from "../../src/entity/Comment";
const MilkDown = dynamic( () => import('../../components/MilkDown/MilkDown'), { ssr: false } )


type Props = {
    post: Post,
    user: User,
    comments: Comment[]
}
const PostsNew: NextPage<Props> = props => {
    return <div className='post-new'>
            <HeadCover username={props.user && props.user.username} />
            <Layout>
                <div> <MilkDown  /> </div>
            </Layout>
        <style jsx>
            {`
            .post-new {
              height: 100vh;
              display: flex;
              flex-direction: column;
            }
            ` }
        </style>
        </div>
    ;
}

export default PostsNew
export const getServerSideProps: GetServerSideProps = theSession(async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    return {
        props: {
            user: JSON.parse(JSON.stringify(user || ''))
        }
    };
});
