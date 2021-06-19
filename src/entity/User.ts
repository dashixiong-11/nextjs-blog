import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {Post} from "./Post";
import {Comment} from './Comment'

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: string;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn('time')
    createAt: Date;
    @UpdateDateColumn('time')
    updateAt: Date;
    @OneToMany(type => Post, post => post.author)
    posts: Post[];
    @OneToMany(type => Comment, comment => comment.user)
    comments:Comment[]


}
