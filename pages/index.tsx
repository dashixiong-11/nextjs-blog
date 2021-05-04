import Head from 'next/head'
import styles from '../styles/Home.module.css'
import shan from 'assets/imgs/shan.jpeg'
import {UAParser} from 'ua-parser-js'
import {GetServerSideProps, NextPage} from "next";

 const  index:NextPage<Props> = (props) =>{
    return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h2>你的浏览器是：{props.browser.name}</h2>

      <main className={styles.main}>
        <h1 className={styles.title}>
            <img src={shan} style={{width:'100%'}} alt=""/>
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
export default index
export const getServerSideProps:GetServerSideProps = async (context) => {
    const ua = context.req.headers['user-agent']
    const r = new UAParser(ua).getResult()
    return  {
        props:{browser:r.browser}
    }

}
