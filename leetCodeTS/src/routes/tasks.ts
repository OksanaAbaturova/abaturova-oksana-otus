import {Request, Response} from "express";
import {ComplexityLevelTask} from '../models/Tasks/ComplexityLevelTask';
import {Task} from '../models/Tasks/Task';
import { URIParamsTaskIdModel } from "../models/Tasks/URIParamsTaskIdModel";
import { RequestWithBody, RequestWithBodyAndParams, RequestWithParams } from "../libs/types";
import { UpdateTaskModel } from "../models/Tasks/UpdateTaskModel";
import { CreateTaskModel } from "../models/Tasks/CreateTaskModel";
const express = require('express');
const router = express.Router();

const tasks: Task[] = [];
const app = express();
app.use(express.json());

//Просмотр всех задач
router.get('/', (req: Request, res: Response) => {
    res.status(200).json(tasks);    
});

//Просмотр конткретной задачи
router.get('/:id', (req: RequestWithParams<URIParamsTaskIdModel>, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Не найден указанный ИД задачи' });
    }
    const one_task: Task | undefined = tasks.find((task) => task.id === parseInt(id));
    if (!one_task) {
        return res.status(404).json({ message: 'Не найдена задача' });
    }
    res.status(200).json(one_task);
});

//Созание задачи
router.post('/', (req: RequestWithBody<CreateTaskModel>, res: Response) => {
    const { title, description, tags, complexityLevel, attachments } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ message: 'Не задано название или описание задачи' });
    }
    if (complexityLevel && ![ComplexityLevelTask.Easy, ComplexityLevelTask.Medium, ComplexityLevelTask.Hard].some(r => r === ComplexityLevelTask[complexityLevel as keyof typeof ComplexityLevelTask])) {
        return res.status(400).json({ message: 'Задан несуществующий уровень сложности' });
    }
  
    const newTask: Task = { 
        id: tasks.length + 1, 
        title: title, 
        description: description, 
        tags: !tags ? [] : tags, 
        complexityLevel: complexityLevel ? ComplexityLevelTask[complexityLevel as keyof typeof ComplexityLevelTask] : ComplexityLevelTask.Easy,   //по умолчанию присваивается легкий уровень сложности
        attachments : attachments ? attachments : [],
    };
    tasks.push(newTask);
  
    res.status(201).json(newTask);
  });

//Обновление задачи
router.patch('/:id', (req: RequestWithBodyAndParams<URIParamsTaskIdModel, UpdateTaskModel>, res: Response) => {
    const { id } = req.params;
    const { complexityLevel } = req.body;
    if (!id) {
        res.status(400).json({ message: 'Не задан ИД задачи' });
    }
    const currentTask: Task | undefined = tasks.find((t) => t.id === parseInt(id));    
    if (!currentTask) {
        return res.status(404).json({ message: 'Не найдена задача' });
    }
    if (complexityLevel && ![ComplexityLevelTask.Easy, ComplexityLevelTask.Medium, ComplexityLevelTask.Hard].some(r => r === ComplexityLevelTask[complexityLevel as keyof typeof ComplexityLevelTask])) {
        return res.status(400).json({ message: 'Изменение невозможно: задан несуществующий уровень сложности' });
    }
    let indexTask: number = tasks.indexOf(currentTask);
    for (const key of Object.keys(req.body)) {       
        if (key === 'title') {
            //@ts-expect-error
            (currentTask as Task).title = req.body[key];
        }
        else if (key === 'description') {
            //@ts-expect-error
            (currentTask as Task).description = req.body[key];
        }
        else if (key === 'tags') {
            (currentTask as Task).tags = req.body[key];
        }
        else if (key === 'complexityLevel') {
            (currentTask as Task).complexityLevel = ComplexityLevelTask[req.body[key] as keyof typeof ComplexityLevelTask];
        }
        else if (key === 'attachments') {
            (currentTask as Task).attachments = req.body[key];
        }
    }    
    tasks.splice(indexTask, 1, currentTask);
    res.status(200).json(currentTask);
});

//Удаление задачи
router.delete('/:id', (req: RequestWithParams<URIParamsTaskIdModel>, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({ message: 'Не найден указанный ИД задачи' });
    }
    const deleteTask: Task | undefined = tasks.find(t => t.id === parseInt(id));
    if (!deleteTask) {
        return res.status(404).json({ message: 'Не найдена задача' });
    }    
    let deleteIndex: number = tasks.indexOf(deleteTask);
    tasks.splice(deleteIndex, 1);

    res.status(201).json({ message: `Удалена задача с ИД ${id}` });
});

module.exports = router;