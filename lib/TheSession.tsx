import {NextApiHandler} from "next";
import {withIronSession} from "next-iron-session";

export const theSession = (handler: NextApiHandler) => {
    return withIronSession(handler, {
        // password: process.env.SECRET_COOKIE_PASSWORD,
        password: 'c2a85490-cc60-4f21-94e8-8dc5dd3220da',
        cookieName: 'blog',
        cookieOptions: {secure: false}
    });
}
export default theSession