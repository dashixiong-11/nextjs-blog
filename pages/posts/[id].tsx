import React, {useState} from "react";
import {Post} from '../../src/entity/Post';
import {Comment} from '../../src/entity/Comment';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import axios, {AxiosResponse} from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import {useRouter} from "next/router";
import theSession from "../../lib/TheSession";
import {User} from "../../src/entity/User";
import {useToast} from "../../hooks/useToast";
import {HeadCover} from "../../components/HeadCover";
import {SideCover} from "../../components/SideCover";
import {Layout} from "../../components/Layout";

const MilkDown = dynamic(() => import('../../components/MilkDown/MilkDown'), {ssr: false})

type Props = {
    post: Post,
    user: User,
    comments: Comment[]
}
const BlogContent: NextPage<Props> = (props) => {
    const {view, info} = useToast(1500)
    const router = useRouter()
    const {post, user, comments} = props
    const [commentContent, setCommentContent] = useState('')
    const onAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentContent(e.currentTarget.value)
    }

    const deleteBlog = (id: number) => {
        axios.delete(`/api/v1/posts/${id}`).then(() => {
            info('删除成功', async () => {
                await router.replace('/posts')
            })
        }, () => {
            info('删除失败')
        })
    }
    const onSubmit = async () => {
        await axios.post('/api/v1/comments', {postId: post.id, content: commentContent}).then(() => {

            info('评论成功')
        }, error => {
            if (error.response) {
                const response: AxiosResponse = error.response
                if (response.status === 401) {
                    info('请先登录')
                }
            }
        })
    }
    return <div className='post'>
        <HeadCover username={props.user && props.user.username} />
            <Layout>
                <div>
                    {user.id === post.authorId && <div className='actions'>
                        <span className='delete' onClick={() => deleteBlog(post.id)}>删除</span>
                        <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a className='edit'>编辑</a></Link>
                    </div>
                    }
                    <MilkDown defaultContent={post.content} defaultTitle={post.title} readOnly/>
                </div>
            </Layout>
        {/*
        <div className='wrapper'>
            <h1>{post.title}</h1>
            <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
        </div>
        <div style={{padding: '1em 2em'}}>
            <article dangerouslySetInnerHTML={{__html: post.content}}>
            </article>
        </div>
*/}
        {/*
        <div className="post-comments">
            <h2>评论</h2>
            <div className="post-comments-content">
                {comments.map(comment => <div key={comment.id}>
                    {comment.username + ' : ' + comment.content}
                </div>)}

            </div>
        </div>
        <div className='comments-post'>
            <textarea onChange={onAreaChange} />
            <div style={{padding: '0 2em'}}>
                <button onClick={onSubmit}>发送</button>
            </div>
        </div>
*/}
        <style jsx>{`
          .post {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          .actions  {
            color: #666;
            font-size: 12px;
            cursor: default;
            padding: 1em 3em;
            display: flex;
            align-items: center;
            justify-content: end;
          }
          .edit { margin-left: 2em }
`}</style>
    </div>
}

export default BlogContent

export const getServerSideProps: GetServerSideProps<any, { id: string }> = theSession(async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    const connection = await getDatabaseConnection();
    // @ts-ignore
    const post = await connection.manager.findOne(Post, context.params.id);
    const comments = await connection.manager.find(Comment, {where: {post: post}})
    return {
        props: {
            user: user,
            post: JSON.parse(JSON.stringify(post || {})),
            comments: JSON.parse(JSON.stringify(comments))
        }
    };
})
