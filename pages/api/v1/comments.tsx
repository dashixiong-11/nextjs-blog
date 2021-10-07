import {NextApiRequest, NextApiResponse} from "next";
import theSession from "../../../lib/TheSession";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {Comment} from "../../../src/entity/Comment";
import {Post} from "../../../src/entity/Post";

const Comments = theSession(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const user = req.session.get('currentUser');
        if (!user) {
            res.statusCode = 401
            res.end()
            return
        }
        const connection = await getDatabaseConnection();
        const {content, postId} = req.body;
        const post = await connection.manager.findOne(Post, postId);
        const comm = new Comment();
        comm.post = post
        comm.content = content
        comm.user = user;
        await connection.manager.save(comm);
        res.json(comm);
    }
})

export default Comments