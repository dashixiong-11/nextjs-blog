import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('text')
    content: string;
    // @Column('text')
    // username: string;
    @ManyToOne('User', 'comments')
    user: User;
    @ManyToOne('Post','comments')
    post: Post;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
