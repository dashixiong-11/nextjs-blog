import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import theSession from "../../../lib/TheSession";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {Post} from "../../../src/entity/Post";

const Posts = theSession(async (req:NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {title, content} = req.body;
        const user = req.session.get('currentUser');
        
        if (!user) {
            res.statusCode = 401
            res.end()
            return
        }
        const post = new Post();
        post.title = title;
        post.content = content;
        post.author = user;
        const connection = await getDatabaseConnection();
        await connection.manager.save(post);
        res.json(post);
    }
})

export default Posts