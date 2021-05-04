import React from 'react'
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

    return <>
        <Head> 我的博客 </Head>
        <Component {...pageProps} />
    </>;
}

export default MyApp
