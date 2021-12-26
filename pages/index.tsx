import React, {useEffect, useRef, useState} from "react";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import Link from "next/link";
import theSession from "../lib/TheSession";
import {User} from "../src/entity/User";

const Home: NextPage<{ user: User }> = (props) => {
    const [load, setLoad] = useState(0)
    const speed = useRef(0)
    const id = useRef(null)
    const scale = (num: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
        return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    }
    const blurring = () => {
        speed.current++
        setLoad(speed.current)
        if (speed.current > 99) {
            clearInterval(id.current)
        }
    }
    useEffect(() => {
        id.current = setInterval(blurring, 30)
    }, [])
    return (
        <>
            <div className='home'>
                {load === 100 ? <span> <Link href="/posts"><a>查看博客</a></Link> </span> : <span>{load}%</span>}
                <div className='cover bg'
                     style={{filter: `blur(${scale(load, 0, 100, 30, 0)}px)`}}>
                    {/*
                    <div className='logo'>这是一个logo</div>
                    <div>我的博客</div>
                    <p className='link'></p>
*/}
                </div>
            </div>
            <style jsx>{`
               
               .home {
                  font-family: 'Ubuntu', sans-serif;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  overflow: hidden;
                  margin: 0;
               }
                 .home > span {
                    font-size: 18px;
                    cursor: pointer;
                    color: #eee;
                    font-weight: bold;
                  }
                .cover {
                    background: url('./loading.jpg') no-repeat center center/cover;
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      z-index: -1;
                      
                                      }
                                `}</style>
        </>
    );
}
export default Home

export const getServerSideProps: GetServerSideProps = theSession(async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    return {
        props: {
            user: JSON.parse(JSON.stringify(user || ''))
        }
    };
});
