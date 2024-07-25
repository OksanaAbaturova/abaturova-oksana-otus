import { Request, Response, NextFunction } from 'express';
import { HttpException } from './src/exceptions/HttpException';
const express = require('express');
const bodyParser = require('body-parser');
const Config = require('./src/libs/config');

const usersRouter = require('./src/routes/users');
const tasksRouter = require('./src/routes/tasks');
const app = express();

const users = {};
const tasks = {};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', usersRouter);
app.use('/task', tasksRouter);
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