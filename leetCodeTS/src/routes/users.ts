import {Request, Response} from "express";
import { unlink } from "fs";
import { install } from "v8-compile-cache-lib";
import { RequestWithBody, RequestWithBodyAndParams, RequestWithParams } from "../libs/types";
import {UserRoles} from '../models/Users/UserRoles';
import {User} from '../models/Users/User';
import { CreateUserModel } from "../models/Users/CreateUserModel";
import { UpdateUserModel } from "../models/Users/UpdateUserModel";
import { URIParamsUserIdModel } from "../models/Users/URIParamsUserIdModel";
const express = require('express');
const router = express.Router();

const users: User[] = [];
const app = express();
app.use(express.json());

//Просмотр всех пользователей
router.get('/', (req: Request, res: Response) => {
    res.status(200).json(users);
});

//Просмотр всех пользователей
/*router.get('/', (req, res) => {
    User.find((err, users) => {
        if (err) return res.status(500).json({error: 'Server error'});

        res.status(500).json(persons);
    });
});*/


//Просмотр конкретного пользователя по id
router.get('/:id', (req: RequestWithParams<URIParamsUserIdModel>, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Не найден указанный ИД пользователя' });
    }
    const user: User | unknown = users.find((user) => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: 'Не найден пользователь' });
    }
    res.status(200).json(user);
});

//Создание пользователя
router.post('/', (req: RequestWithBody<CreateUserModel>, res: Response) => {
    const { name, password, role } = req.body;
    let dataRole: UserRoles = role ? Object.keys(UserRoles).some(x => x === role) ? UserRoles[role as keyof typeof UserRoles] : UserRoles.ErrorRole : UserRoles.User;
    if (!name || !password) {
      return res.status(400).json({ message: 'Не задано имя или пароль пользователя' });
    }
    //валидация на тип роли
    if (dataRole && ![UserRoles.Admin, UserRoles.User, UserRoles.Interviewer].some(r => r === dataRole)) {
        return res.status(400).json({ message: 'Задана несуществующая роль' });
    }

    const newUser: User = {
        id: users.length + 1, 
        name: name, 
        password: password,
        role: dataRole
    };
    users.push(newUser);
    res.status(201).json(newUser);    
  });

/*router.post('/', (req, res) => {
    const { name, password, role } = req.body;
    let dataRole = role ? role : 'user';
    if (!name || !password) {
      return res.status(400).json({ message: 'Не задано имя или пароль пользователя' });
    }
    //валидация на тип роли
    if (dataRole && !['admin', 'user', 'interviewer'].some(r => r === dataRole)) {
        return res.status(400).json({ message: 'Задана несуществующая роль' });
    }

    const newUser = new User({
        id: User.length + 1, 
        name: name, 
        password: password,
        role: dataRole
    });

    newUser.save((err) => {
        if (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).json({error: 'Ошибка валидации при создании пользователя'});
            }
            return res.status(500).json({error: 'Серверная ошибка при создании пользователя'});
        }

        res.status(201).json(newUser);
    });

    
  });*/


//Обновление данных о существующем пользователе
router.patch('/:id', (req: RequestWithBodyAndParams<URIParamsUserIdModel, UpdateUserModel>, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;
    if (!id) {
        res.status(400).json({ message: 'Не задан идентификатор пользователя' });
    }
    const currentUser: User | unknown = users.find((us) => us.id === parseInt(id));    
    if (!currentUser) {
        return res.status(404).json({ message: 'Не найден пользователь' });
    }
    if (role && ![UserRoles.Admin, UserRoles.User, UserRoles.Interviewer].some(x => x === UserRoles[role as keyof typeof UserRoles])) {
        return res.status(400).json({ message: 'Изменение невозможно: задана несуществующая роль' });
    }
    let indexUser: number = users.indexOf(<User>currentUser);
    for (const key of Object.keys(req.body)) {
        if (key === 'name') {
            (<User>currentUser).name = req.body[key];
        }
        else if (key === 'password') {
            (<User>currentUser).password = req.body[key];
        }
        else if (key === 'role') {
            (<User>currentUser).role = UserRoles[role as keyof typeof UserRoles];
        }
    }    
    users.splice(indexUser, 1, <User>currentUser);
    res.status(200).json(currentUser);
});



//Удаление пользователя
router.delete('/:id', (req: RequestWithParams<URIParamsUserIdModel>, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({ message: 'Не задан идентификатор пользователя' });
    }
    const deleteUser: User | unknown = users.find(u => u.id === parseInt(id));
    if (!deleteUser) {
        return res.status(404).json({ message: 'Не найден пользователь' });
    }    
    let deleteIndex: number = users.indexOf(<User>deleteUser);
    users.splice(deleteIndex, 1);

    res.status(201).json({ message: `Удален пользователь с ИД ${id}` });
});

module.exports = router;