import React from "react";
import {NextPage} from "next";
import {useEditor} from "../../hooks/useEditor";
import dynamic from "next/dynamic";

let BraftEditor: any = dynamic(() => import('braft-editor').then((module: any) => {
    BraftEditor = module.default
    return BraftEditor
}), {
    ssr: false // 禁用服务端渲染
})
import 'braft-editor/dist/index.css'

const PostsNew: NextPage = () => {
    const {Editor} = useEditor({method: 'post', path: '/api/v1/posts'})

    return (<div> {Editor} </div>);
}

export default PostsNew