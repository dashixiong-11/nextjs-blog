/// <reference types="next" />
/// <reference types="next/types/global" />
declare module "*.jpeg"{
    const value:string
    export default value
}

declare module "*.png"{
    const value:string
    export default value
}
type Props = {
    browser:{name:string,version:string,major:string},
    posts:Post[]
}
type Post = {
    id: string;
    date: string;
    title: string;
    content: string;
    htmlContent: string;
}