import { Column, Entity, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { ComplexityLevelTask } from "../../models/Tasks/ComplexityLevelTask";
import { TaskAndUser } from "./taskAndUser.entity";


@Entity('tasks')
export class Task {
    @PrimaryColumn()
    id: number;

    @Column({
        type: 'character varying', 
        length: 256, 
        name: 'title', 
        nullable: false
    })
    title: string;

    @Column({
        type: 'character varying', 
        length: 1024, 
        name: 'description', 
        nullable: false
    })
    description: string;

    @Column({
        type: 'character varying', 
        length: 512, 
        name: 'tags',
        nullable: true
    })
    tags?: string[];

    @Column({
        type: 'enum', 
        enum: ComplexityLevelTask, 
        default: ComplexityLevelTask.Easy,
        name: 'complexityLevel', 
        nullable: false
    })
    complexityLevel: ComplexityLevelTask.Easy;

   /* @Column({
        type: 'character varying', 
        length: 512, 
        name: 'attachments',
        nullable: true
    })
    attachments?: any[];*/

    @OneToMany(type => TaskAndUser, (taskAndUser) => taskAndUser.task) 
    tasksAndUser!: TaskAndUser[]; 
}