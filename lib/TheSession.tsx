import {NextApiHandler} from "next";
import {withIronSession} from "next-iron-session";

export const theSession = (handler: NextApiHandler) => {
    return withIronSession(handler, {
        // password: process.env.SECRET_COOKIE_PASSWORD,
        password: process.env.SECRET,
        cookieName: 'blog',
        cookieOptions: {secure: false}
    });
}
export default theSession