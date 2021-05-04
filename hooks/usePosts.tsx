import {useEffect, useState} from "react";
import axios from "axios";

type Posts = {
    id:string,
    title:string,
    content:string
}
export const usePosts = () => {
    const [posts,setPosts] = useState<Posts[]>([])
    const [isLoading,setIsLoading] = useState(true)
    const [isEmpty,setIsEmpty] = useState(false)

    useEffect(()=>{
        axios.post('/api/v1/posts').then(res => {
            setIsLoading(false)
            setPosts(res.data)
            if(res.data.length === 0){
                setIsEmpty(true)
            }
        })
    },[])
    return {posts,isEmpty,isLoading,setPosts,setIsEmpty,setIsLoading}
}