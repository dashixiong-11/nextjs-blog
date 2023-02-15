import React from "react";
import Link from "next/link";

export const HeadCover: React.FC<{username:string}> = props => {
    return <>
        <div className='nav'>
            {/*<div className='head-cover' />*/}
            <img src='/blog.svg' alt="" className="logo"/>
            <div className='nav-container'>
                {
                    props.username?
                        <div className='nav-username'>
                            <span>{props.username}</span>
                            <Link href='/posts/new' as={`/posts/new`}>
                                <button>写博客</button>
                            </Link>
                        </div>
                        :
                    <Link href='/sign_in' as={`/sign_in`}>
                        <button>登录</button>
                    </Link>
                }
            </div>
        </div>
        <style jsx>
            {`
              a {
                cursor: default;
              }

              .nav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1em 2em;
                border-bottom: 1px solid #d0d0d0;
              }

              .nav-username span {
                color: #333;
                margin-right: 1em;
              }

              .nav .nav-container button {
                border: none;
                padding: 0 20px;
                background: #000;
                color: #fff;
                line-height: 30px;
                border-radius: 15px;
              }

              .logo {
                width: 30px;
              }

              .head-cover {
                width: 100%;
                height: 150px;
                background: url('./loading.jpg') no-repeat center center/cover;
                filter: blur(6px);
              }
            `}

        </style>
    </>

}
