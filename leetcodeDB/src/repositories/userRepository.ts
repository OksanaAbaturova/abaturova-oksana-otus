import {Request, Response} from "express";
import { RequestWithBody, RequestWithBodyAndParams, RequestWithParams } from "../libs/types";
import {UserRoles} from '../models/Users/UserRoles';
import { CreateUserModel } from "../models/Users/CreateUserModel";
import { UpdateUserModel } from "../models/Users/UpdateUserModel";
import { URIParamsUserIdModel } from "../models/Users/URIParamsUserIdModel";
import ds from "../config/datasource";
import { User } from "../db/entities/user.entity";
import { validate } from "class-validator";
const express = require('express');
const router = express.Router();

const app = express();
app.use(express.json());

const repoUsers = ds.getRepository(User);

//Просмотр всех пользователей
router.get('/',  async (req: Request, res: Response) => {
    const allUser: User[] = await repoUsers.find();
    res.status(200).send(allUser);
});

//Просмотр конкретного пользователя по id
router.get('/:id', async (req: RequestWithParams<URIParamsUserIdModel>, res: Response) => {
    const id: number = parseInt(req.params.id);
    if (!id) {
        res.status(400).json({ message: 'Не найден указанный ИД пользователя' });
    }    
    const oneUser: User | null = await repoUsers.findOneBy({id});
    if (!oneUser) {
        return res.status(404).json({ message: `Не найден пользователь c id=${id}` });
    }
    res.status(200).send(oneUser);
});

//Создание пользователя
router.post('/', async (req: RequestWithBody<CreateUserModel>, res: Response) => {
    const bodyData: CreateUserModel  = req.body;

    if (!bodyData.name || !bodyData.password) {
        return res.status(400).json({ message: 'Не задано имя или пароль пользователя' });
    }    
    if (bodyData.role && ![UserRoles.Admin, UserRoles.User, UserRoles.Interviewer].some(r => r === UserRoles[bodyData.role as keyof typeof UserRoles])) {
        return res.status(400).json({ message: 'Задана несуществующая роль' });
    }

    //Валидация на дубль
    if (await repoUsers.existsBy({ name: bodyData.name})) {
        return res.status(400).json({ message: 'Данное имя уже зарегистрировано на другого пользователя' });
    }
    if (bodyData.email && await repoUsers.existsBy({ email: bodyData.email})) {
        return res.status(400).json({ message: 'Данный эл. адрес уже привязан к другому логину' });
    }

    const newUser: User = await repoUsers.create(bodyData);
    //валидация
    const errors = await validate(newUser);
    if (errors && errors.length > 0) {
        console.log(errors);
        let errorsMessages: string[] = new Array<string>;
        errors.forEach((x) => {
            console.log(x);
            if (x.constraints) {
                Object.values(x.constraints).forEach(x => errorsMessages.push(x));
            }
        });
        return res.status(400).json({ message: errorsMessages });
    }
    await repoUsers.save(newUser);

    return res.sendStatus(201);    
  });

//Обновление данных о существующем пользователе
router.put('/:id', async (req: RequestWithBodyAndParams<URIParamsUserIdModel, /*Omit<User,"id">*/UpdateUserModel>, res: Response) => {
    const id: number = parseInt(req.params.id);
    const bodyData: /*Omit<User,"id">*/UpdateUserModel  = req.body;
    if (!id) {
        res.status(400).json({ message: 'Не задан ИД пользователя' });
    }
    if (!await repoUsers.existsBy({ id: id})) {
        return res.status(404).json({ message: `Не найден пользователь c id=${id}` });
    }

    if (bodyData.role && ![UserRoles.Admin, UserRoles.User, UserRoles.Interviewer].some(r => r === UserRoles[bodyData.role as keyof typeof UserRoles])) {
        return res.status(400).json({ message: 'Задана несуществующая роль' });
    }

    if (bodyData.email && !/^\S+@\S+\.\S+$/.test(bodyData.email)) {
        return res.status(400).json({ message: 'Некорректно задан email' });
    } 

    await repoUsers.update(id, bodyData);
    res.status(200).json({ message: `Обновлен пользователь с ИД ${id}` }); 
});



//Удаление пользователя
router.delete('/:id', async (req: RequestWithParams<URIParamsUserIdModel>, res: Response) => {

    const id: number = parseInt(req.params.id);
    if (!id) {
        res.status(404).json({ message: 'Не задан ИД пользователя' });
    }
    if (!await repoUsers.existsBy({ id: id})) {
        return res.status(404).json({ message: `Не найден пользователь c id=${id}` });
    }

    await repoUsers.delete(id);
    res.status(201).json({ message: `Удален пользователь с ИД ${id}` });
});

module.exports = router;