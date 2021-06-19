import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne,OneToMany} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: string;
    @Column('varchar')
    title: string;
    @Column('text')
    content: string
    @CreateDateColumn('time')
    createAt: Date;
    @UpdateDateColumn('time')
    updateAt: Date;
    @ManyToOne(type => User, user => user.posts)
    author: User
    @OneToMany(type => Comment, comment => comment.post)
    comments:Comment[]
}
