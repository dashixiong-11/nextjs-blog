import React, {useState} from "react";
import {Post} from '../../src/entity/Post';
import {Comment} from '../../src/entity/Comment';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {GetServerSideProps, NextPage} from "next";
import Link from "next/link";
import axios, {AxiosResponse} from "axios";

type Props = {
    post: Post,
    comments: Comment[]
}
const BlogContent: NextPage<Props> = (props) => {
    const {post, comments} = props
    const [commentContent, setCommentContent] = useState('')
    const onAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentContent(e.currentTarget.value)
    }
    const onSubmit = async () => {
        await axios.post('/api/v1/comments', {postId: post.id, content: commentContent}).then(() => {
            window.alert('评论成功')
            window.location.reload()
        }, error => {
            if (error.response) {
                const response: AxiosResponse = error.response
                if (response.status === 401) {
                    window.alert('请先登录')
                }
            }
        })
    }
    return <>
        <div>文章详情</div>
        <div className='wrapper'>
            <h1>{post.title}</h1>
            <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
        </div>
        <div style={{padding: '1em 2em'}}>
            <article dangerouslySetInnerHTML={{__html: post.content}}>
            </article>
        </div>
        <div className="post-comments">
            <h2>评论</h2>
            <div className="post-comments-content">
                {comments.map(comment => <div key={comment.id}>
                    {comment.username + ' : ' + comment.content}
                </div>)}

            </div>
        </div>
        <div className='comments-post'>
            <textarea onChange={onAreaChange}></textarea>
            <div style={{padding: '0 2em'}}>
                <button onClick={onSubmit}>发送</button>
            </div>
        </div>
        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
          }
          .post-comments {
            margin-top: 2em;
          }
          .post-comments-content {
            padding: 1em 2em;
          }
          .comments-post {
            padding: 1em 2em;
            display: flex;
            align-items: center;
            position: fixed;
            bottom: 10px;
            left: 0;
            right: 0;
            
          }
          /*
          .comments-post  button {
            border: none;
            
          }
          */
          textarea {
            height: 5em;
            padding: 8px;
            flex-grow: 1;
            font-size: 16px;
          }
`}</style>
    </>
}

export default BlogContent

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, context.params.id);
    const comments = await connection.manager.find(Comment, {where: {post: post}})
    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
            comments: JSON.parse(JSON.stringify(comments))
        }
    };
};
