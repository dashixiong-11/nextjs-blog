/// <reference types="next" />
/// <reference types="next/types/global" />
import * as next from 'next'

declare module "*.jpeg" {
    const value: string
    export default value
}

declare module "*.png" {
    const value: string
    export default value
}
type Props = {
    posts: Post[]
}
type Post = {
    id: string;
    date: string;
    title: string;
    content: string;
    htmlContent: string;
}
declare module 'next' {
    import {Session} from 'next-iron-session';

    interface NextApiRequest {
        session: Session
    }
}
