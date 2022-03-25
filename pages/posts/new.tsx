import React from "react";
import {NextPage} from "next";
import dynamic from 'next/dynamic'
const MilkDown = dynamic( () => import('../../components/MilkDown/MilkDown'), { ssr: false } )


const PostsNew: NextPage = () => {
    return (<div> <MilkDown  /> </div>);
}

export default PostsNew