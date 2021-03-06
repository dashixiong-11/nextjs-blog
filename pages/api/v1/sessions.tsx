import {NextApiHandler} from 'next';
import {SignIn} from "../../../src/modal/SignIn";
import {theSession} from '../../../lib/TheSession'



const Sessions: NextApiHandler = async (req, res) => {
    res.setHeader('Content-type', 'application/json; charset=utf-8')
    const {username, password} = req.body
    const signIn = new SignIn()
    signIn.username = username
    signIn.password = password
    await signIn.validate()
    if (signIn.hasErrors()) {
        res.statusCode = 422
        res.end(JSON.stringify(signIn.errors))
    } else {
        req.session.set('currentUser',signIn.user)
        await req.session.save()
        res.statusCode = 200
        res.end(JSON.stringify(signIn.user))
    }
    // res.statusCode = 200
    // res.end()
}

export default theSession(Sessions)

