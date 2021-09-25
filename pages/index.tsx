import React from "react";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import Link from "next/link";
import theSession from "../lib/TheSession";
import {User} from "../src/entity/User";

const Home: NextPage<{ user: User }> = (props) => {
    return (
        <>
            <div className='cover'>
                <div className='logo'>这是一个logo</div>
                <div>我的博客</div>
                <p className='link'><Link href="/posts"><a>查看博客</a></Link></p>
            </div>
            <style jsx>{`
                .header {
                  padding: 10px 1em;
                  display: flex;
                  align-items: center;
                }
                .header > button {
                  margin-left: auto;
                }
                .cover {
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  justify-content: center;
                  height: 100vh;
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
