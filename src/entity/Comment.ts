import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne,UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id: string;
    @Column('text')
    content: string
    @CreateDateColumn('time')
    createAt: Date;
    @UpdateDateColumn('time')
    updateAt: Date;
    @ManyToOne(type => User, user => user.comments)
    user: User
    @ManyToOne(type => Post, post => post.comments)
    post: Post
}
