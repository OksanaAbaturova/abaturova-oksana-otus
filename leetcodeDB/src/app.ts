import { Request, Response, NextFunction } from 'express';
import { HttpException } from './exceptions/HttpException';
const express = require('express');
const bodyParser = require('body-parser');
const Config = require('./libs/config');
import ds from "./config/datasource";
const usersRepository = require('./repositories/userRepository');
const tasksRepository = require('./repositories/taskRepository');
const taskAndUserRepository = require('./repositories/taskAndUserRepository');
const app = express();

ds.initialize().then(x => {
    console.log('БД подключена');
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', usersRepository);
app.use('/task', tasksRepository);
app.use('/all', taskAndUserRepository);
// ==================Errors
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
        console.log('Error: ', err.stack);
        res.status(502).json({message: 'Server Error'});
    }
    next(err);
});
app.use((req: Request, res: Response) => {
    const err: HttpException = new HttpException(404, 'Not Found');
    res.status(err.status).json({message:err.message});
});

app.listen(Config.port, () => {console.log(`Началось прослушивание http://localhost:${Config.port}`);});

module.exports.app = app;