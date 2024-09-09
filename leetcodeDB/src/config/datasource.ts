import { DataSourceOptions, DataSource } from "typeorm";
import { User } from "../db/entities/user.entity";
import { Task } from "../db/entities/task.entity";
import { TaskAndUser } from "../db/entities/taskAndUser.entity";


const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres', 
    port: 5432,
    database: 'leetcode',
    entities: [User, Task, TaskAndUser],
    migrationsTableName: '__migrations',
    migrations: ['../**/migrations/*.{.ts, .js}']
};

export default new DataSource(options);