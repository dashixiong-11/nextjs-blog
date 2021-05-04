import React,{useEffect} from "react";
import {usePosts} from "hooks/usePosts";
import {NextPage} from "next";
import Link from "next/link";
import {getPost} from "../../lib/getPosts";

 const Index:NextPage = () => {
     const {posts,isLoading,isEmpty} = usePosts()

    return <>
        <h1>文章列表</h1>
        {posts.map( p =>
            <Link key={p.id} href="/blog/[id]" as={`/blog/${p.id}`}>
                <div >{p.id}</div>
            </Link>
        )}
    </>
}
export default Index

