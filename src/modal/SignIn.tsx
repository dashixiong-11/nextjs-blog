import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import {User} from "../entity/User";
import md5 from "md5";
import {useForm} from "../../hooks/useForm";

export class SignIn {
    username: string
    password: string
    user: User
    errors = {username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]};


    async validate() {
        const connection = await getDatabaseConnection()
        const user = await connection.manager.findOne(User, {where: {username: this.username}})
        if (this.username.trim() === '') {
            this.errors.username.push('请填写用户名')
        }
        this.user = user
        if (user) {
            if (user.passwordDigest !== md5(this.password)) {
                this.errors.password.push('密码不匹配')
            }
        } else {
            this.errors.username.push('用户名不存在')
        }
    }

    hasErrors() {
        return !!Object.values(this.errors).find(v => v.length > 0)
    }
}