import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    BeforeInsert,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import _ from 'lodash';
import {Post} from './Post';
import {Comment} from './Comment';
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import md5 from "md5";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany('Post', 'author')
    posts: Post[];
    @OneToMany('Comment', 'user')
    comments: Comment[]

    password: string;
    passwordConfirmation: string;
    errors = {username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]};

    async validate() {

        if (this.username.trim() === '') {
            this.errors.username.push('不能为空')
        }
        if (!/[a-z0-9A-Z]/.test(this.username.trim())) {
            this.errors.username.push('不合法')
        }
        if (this.username.trim().length > 42) {
            this.errors.username.push('太长')
        }
        if (this.username.trim().length < 6) {
            this.errors.username.push('太短')
        }
        const found = await (await getDatabaseConnection()).manager.find(User, {username: this.username})
        if (found.length > 0) {
            this.errors.username.push('用户名已被占用')
        }
        if (this.password === '') {
            this.errors.password.push('不能为空')
        }
        if (this.password !== this.passwordConfirmation) {
            this.errors.passwordConfirmation.push('密码不匹配')
        }
    }

    hasErrors() {
        return !!Object.values(this.errors).find(v => v.length > 0)
    }

    @BeforeInsert()
    generatePasswordDigest() {
        this.passwordDigest = md5(this.password)
    }

    toJSON() {
        return _.omit(this, ['password', 'passwordConfirmation', 'passwordDigest', 'errors'])
    }
}