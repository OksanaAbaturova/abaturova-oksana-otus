import { IsEmail } from "class-validator";
import "reflect-metadata"
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TaskAndUser } from "./taskAndUser.entity";



@Entity('users')
export class User {
    @PrimaryColumn()
    id: number;

    @Column({type: 'character varying', length: 40, name: 'name', nullable: false})
    name: string;

    @Column({type: 'character varying', length: 30, name: 'password', nullable: false})
    password: string;

    @IsEmail({}, { message: 'Некорректно задан email' })
    @Column({type: 'character varying', length: 30, name: 'email'})
    email?: string;

    @Column({type: 'character varying', length: 11, name: 'role', nullable: false})
    role: string;
    
    @OneToMany(type => TaskAndUser, (taskAndUser) => taskAndUser.user) 
    tasksAndUser!: TaskAndUser[]; 
}

