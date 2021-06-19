import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    title: string;
    @Column('text')
    content: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @ManyToOne(type => User, user => user.posts)
    author: User;
    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];
}
