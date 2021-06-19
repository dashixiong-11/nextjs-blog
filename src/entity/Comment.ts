import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('text')
    content: string;
    @ManyToOne(type => User, user => user.comments)
    user: User;
    @ManyToOne(type => Post, post => post.comments)
    post: Post;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
