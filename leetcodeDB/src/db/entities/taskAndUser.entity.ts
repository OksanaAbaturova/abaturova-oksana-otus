import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique, UpdateDateColumn } from "typeorm";
import "reflect-metadata";
import { User } from "./user.entity";
import { Task } from "./task.entity";


@Entity('tasks_users')
export class TaskAndUser {

    @PrimaryColumn({name: 'userid', type: 'int'})
    userid: number;

    @ManyToOne(type => User, /*{eager: true}*/)
    @JoinColumn({name: 'userid'})
    user: User;

    @PrimaryColumn({name: 'taskid', type: 'int'})
    taskid: number;

    @ManyToOne(type => Task,/* {eager: true}*/)
    @JoinColumn({name: 'taskid'})
    task: Task

    /**Решение */
    @Column({
        type: 'character varying', 
        length: 10000,
        name: 'decision', 
        nullable: true
    })
    decision?: string;

    /** % выполнения */
    @Column({
        type: 'numeric', 
        precision: 5,
        scale: 2,
        name: 'accertance', 
        default: 0,
        nullable: true
    })
    accertance?: number;

    /** Решено/не решено */
    @Column({
        type: 'boolean',
        name: 'isdone', 
        default: false
    })
    isdone: boolean;

    /** Дата обновления */
    @CreateDateColumn()
    @Column({
        type: 'date',
        name: 'updated', 
        nullable: false,
        default: new Date()
    })
    updated: Date;
}
