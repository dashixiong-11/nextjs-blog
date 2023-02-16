import {NextApiRequest, NextApiResponse} from "next";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {User} from "../../../src/entity/User";
import md5 from "md5";

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const connection = await getDatabaseConnection()
    
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    const {username, password, passwordConfirmation} = req.body
    const user = new User()
    user.username = username.trim()
    user.password = password
    user.passwordConfirmation = passwordConfirmation
    user.passwordDigest = md5(password)
    await user.validate()
    if (await user.hasErrors()) {
        res.statusCode = 422
        res.write(JSON.stringify(user.errors))
    } else {
        user.username = username.trim()
        user.passwordDigest = md5(password)
        await connection.manager.save(user)
        res.statusCode = 200
        res.write(JSON.stringify(user))
    }
    res.end()
}

export default Users
