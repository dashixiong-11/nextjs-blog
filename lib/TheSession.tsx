import {GetServerSideProps, NextApiHandler} from "next";
import {withIronSession} from "next-iron-session";

export const theSession = (handler: NextApiHandler | GetServerSideProps) => {
    return withIronSession(handler, {
        // password: process.env.SECRET_COOKIE_PASSWORD,
        // 本地文件 .env.local 写入环境变了 SECRET=xxxx (随机字符串)
        password: process.env.SECRET,
        cookieName: 'blog',
        cookieOptions: {secure: false}
    });
}
export default theSession