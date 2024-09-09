import {Request, Response} from "express";
import { RequestWithBody, RequestWithParams } from "../libs/types";
import "reflect-metadata";
import ds from "../config/datasource";
import { User } from "../db/entities/user.entity";
import { validate } from "class-validator";
import { TaskAndUser } from "../db/entities/taskAndUser.entity";
import { URIParamsUserIdByTaskAndUserModel } from "../models/TaskAndUser/URIParamsUserIdByTaskAndUserModel";
import { CreateTaskAndUserModel } from "../models/TaskAndUser/CreateTaskAndUserModel";
import { Task } from "../db/entities/task.entity";
import { UpdateTaskAndUserModel } from "../models/TaskAndUser/UpdateTaskAndUserModel";
const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());

const repoDatas = ds.getRepository(TaskAndUser);
const repoUsers = ds.getRepository(User);
const repoTasks = ds.getRepository(Task);

//Просмотр всех задач всех пользователей
router.get('/',  async (req: Request, res: Response) => {
    const allDatas: TaskAndUser[] = await repoDatas.find();
    return res.status(200).send(allDatas);
});

//Просмотр всех задач конкретного пользователя
router.get('/:userid',  async (req: RequestWithParams<URIParamsUserIdByTaskAndUserModel>, res: Response) => {
    const id: number = parseInt(req.params.userid);
    const { taskid, isdone } = req.query;
    if (!id) {
        res.status(404).json({ message: 'Не задан ИД пользователя' });
    }
    if (!await repoUsers.existsBy({ id: id})) {
        return res.status(404).json({ message: `Не найден пользователь c id=${id}` });
    }

    let tasksByOneUser: TaskAndUser[] = await repoDatas.findBy({userid: id});
    if (!taskid && !isdone) {
        return res.status(200).send(tasksByOneUser);
    }
    //Задачи по фильтру
    else if (tasksByOneUser.length > 0) {
        if (taskid) {
            tasksByOneUser = tasksByOneUser.some(x => x.taskid === +taskid) ? tasksByOneUser.filter(x => x.taskid === +taskid) : [];
        }
        if (isdone !== undefined && tasksByOneUser.length > 0) {
            tasksByOneUser = tasksByOneUser.filter(x => x.isdone === (String(isdone).toLocaleLowerCase() === 'true'));
        }
    }
    return res.status(200).send(tasksByOneUser);
});

//Создание привязки "пользователь-задача"
router.post('/', async (req: RequestWithBody<CreateTaskAndUserModel>, res: Response) => {
    const bodyData: CreateTaskAndUserModel  = req.body;

    if (!bodyData.userid || !bodyData.taskid) {
        return res.status(400).json({ message: 'Не задан пользователь и/или задача' });
    }
    if (!await repoUsers.existsBy({ id: +bodyData.userid})) {
        return res.status(404).json({ message: `Не найден пользователь c id=${bodyData.userid}` });
    }
    if (!await repoTasks.existsBy({ id: +bodyData.taskid})) {
        return res.status(404).json({ message: `Не найдена задача c id=${bodyData.taskid}` });
    } 

    //Валидация на дубль
    if (await repoDatas.existsBy({ userid: +bodyData.userid, taskid: +bodyData.taskid})) {
        return res.status(400).json({ message: `На пользователя с ИД ${bodyData.userid} уже существует привязанная задача с ИД ${bodyData.taskid}` });
    }    

    const newTaskAndUser: TaskAndUser = await repoDatas.create(bodyData);   
    await repoDatas.save(newTaskAndUser);

    return res.sendStatus(201);    
  });

//Обновление данных о существующем пользователе
router.put('/', async (req: RequestWithBody<UpdateTaskAndUserModel>, res: Response) => {   
    const bodyData: UpdateTaskAndUserModel  = req.body;
    if (!bodyData.userid || !bodyData.taskid) {
        return res.status(400).json({ message: 'Не задан пользователь и/или задача для изменения' });
    }
    if (!await repoUsers.existsBy({ id: +bodyData.userid})) {
        return res.status(404).json({ message: `Не найден пользователь c id=${bodyData.userid}` });
    }
    if (!await repoTasks.existsBy({ id: +bodyData.taskid})) {
        return res.status(404).json({ message: `Не найдена задача c id=${bodyData.taskid}` });
    }
    if (bodyData.accertance && (+bodyData.accertance > 100 || +bodyData.accertance < 0)) {
        return res.status(400).json({ message: `Неверно указан % выполнения задачи ` });
    }
    if (!bodyData.accertance && !bodyData.decision && !bodyData.isdone) {
        return res.status(400).json({ message: `Не указаны данные для обновления` });
    }
    const updateTaskAndUser: TaskAndUser | null = await repoDatas.findOneBy({userid: +bodyData.userid, taskid: +bodyData.taskid});
    //if (!await repoDatas.existsBy({ userid: +bodyData.userid, taskid: +bodyData.taskid})) {
    if (updateTaskAndUser === null) {
        return res.status(404).json({ message: `Не существует привязки пользователя с ИД ${bodyData.userid} с задачей с ИД ${bodyData.taskid}` });
    }

    if (bodyData.decision)      { updateTaskAndUser.decision = bodyData.decision; }
    if (bodyData.accertance)    { updateTaskAndUser.accertance = +bodyData.accertance; }
    if (bodyData.isdone)        { updateTaskAndUser.isdone = bodyData.isdone; }

    try {
        await repoDatas.update({userid: +bodyData.userid, taskid: +bodyData.taskid}, updateTaskAndUser);
        res.status(200).json({ message: `Обновлена задача ${bodyData.taskid} для пользователя с ИД ${bodyData.userid}` }); 
    }
    catch (error) {
        throw error;
    }
});

//Удаление всех задач конкретного пользователя
router.delete('/:userid', async (req: RequestWithParams<URIParamsUserIdByTaskAndUserModel>, res: Response) => {
    const id: number = parseInt(req.params.userid);
    const { taskid } = req.query;
    if (!id) {
        res.status(404).json({ message: 'Не задан ИД пользователя' });
    }
    if (!await repoUsers.existsBy({ id: id})) {
        return res.status(404).json({ message: `Не найден пользователь c id=${id}` });
    }

    let tasksByOneUser: TaskAndUser[] = await repoDatas.findBy({userid: id});
    if (tasksByOneUser.length === 0) {
        return res.status(404).json({ message: `У пользователя c id=${id} нет задач` });
    }
    else 
    {
        if (taskid) {
            tasksByOneUser = tasksByOneUser.filter(x => x.taskid === +taskid);
            if (tasksByOneUser.length === 0) {
                return res.status(404).json({ message: `У пользователя c id=${id} нет задачи c id=${taskid}` });
            }
            await repoDatas.delete({ userid: id, taskid: +taskid});
            return res.status(201).json({ message: `Удалена задача с ИД ${taskid} пользователя с ИД ${id}` });
        }
        await repoDatas.delete({ userid: id});
        return res.status(201).json({ message: `Удалены все задачи пользователя с ИД ${id}` });
    }
});

module.exports = router;