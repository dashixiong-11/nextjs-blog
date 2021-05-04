import path from "path";
import fs,{promises as fsPromise} from "fs";
import marked from 'marked'
import matter from "gray-matter";

const markdownDir = path.join(process.cwd(), 'markdown');
export const getPosts = async () => {
    const fileNames = await fsPromise.readdir(markdownDir)
    const posts = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/g, '')
        const fullPath = path.join(markdownDir, fileName)
        const text = fs.readFileSync(fullPath, 'utf-8')
        const {data: {title}, content} = matter(text)
        return {
            id, title, content
        }
    })
    return posts
}

export const getPost = async (id: string) => {
    const fullPath = path.join(markdownDir, id + '.md')
    const text = fs.readFileSync(fullPath, 'utf-8')
    const {data: {title}, content} = matter(text)
    const htmlContent = marked(content)
    return JSON.parse(JSON.stringify({
        id, title, htmlContent,content
    }))
}

export const getPostIds = async () => {
    const fileNames = await fsPromise.readdir(markdownDir)
    return fileNames.map( fileName => fileName.replace(/\.md$/g,''))
}