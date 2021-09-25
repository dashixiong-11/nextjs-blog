import React from "react";
import Link from 'next/link';
import styles from './nav.module.scss'

export const Nav: React.FC = () => {
    return <>
        <div className={styles.nav}>
            <Link href='/posts/new' as={`/posts/new`}>
                <a> 写博客 </a>
            </Link>
            {/* 当前登录用户：{user.username} */}
        </div>
    </>
}
