import React from "react";
import {NextPage} from "next";
import dynamic from 'next/dynamic'
// import {useEditorMd} from "../../hooks/useEditor";
const MilkDown = dynamic( () => import('../../components/MilkDown/MilkDown'), { ssr: false } )


const PostsNew: NextPage = () => {
    // const {EditorView} = useEditorMd({method: 'post', path: '/api/v1/posts'})

    return (<div> <MilkDown  /> </div>);
}

export default PostsNew