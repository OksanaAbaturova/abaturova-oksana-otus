import {Request, Response} from "express";
const express = require('express');
import ds from "../config/datasource";
import { Task } from "../db/entities/task.entity";
import { RequestWithBody, RequestWithBodyAndParams, RequestWithParams } from "../libs/types";
import { CreateTaskModel } from "../models/Tasks/CreateTaskModel";
import { ComplexityLevelTask } from "../models/Tasks/ComplexityLevelTask";
import { URIParamsTaskIdModel } from "../models/Tasks/URIParamsTaskIdModel";

const router = express.Router();
const app = express();
app.use(express.json());

const repoTasks = ds.getRepository(Task);

//Просмотр всех задач
router.get('/', async (req: Request, res: Response) => {
    const allTask: Task[] = await repoTasks.find();
    res.status(200).send(allTask);
});


//Просмотр конткретной задачи
router.get('/:id',  async (req: RequestWithParams<URIParamsTaskIdModel>, res: Response) => {
    const id: number = parseInt(req.params.id);
    if (!id) {
        res.status(400).json({ message: 'Не найден указанный ИД задачи' });
    }
    const oneTask: Task | null = await repoTasks.findOneBy({id});
    if (!oneTask) {
        return res.status(404).json({ message: `Не найдена задача c id=${id}` });
    }
    res.status(200).send(oneTask);
});


//Созание задачи
router.post('/', async (req: RequestWithBody<Partial<Task>/*CreateTaskModel*/>, res: Response) => {
    const bodyData: Partial<Task> /*CreateTaskModel*/  = req.body;
    if (!bodyData.title || !bodyData.description) {
        return res.status(400).json({ message: 'Не задано название или описание задачи' });
    }   
    if (bodyData.complexityLevel && ![ComplexityLevelTask.Easy, ComplexityLevelTask.Medium, ComplexityLevelTask.Hard].some(r => r === ComplexityLevelTask[bodyData.complexityLevel as keyof typeof ComplexityLevelTask])) {
        return res.status(400).json({ message: 'Задан несуществующий уровень сложности' });
    }
    if (!bodyData.complexityLevel) {
        bodyData.complexityLevel = ComplexityLevelTask.Easy;
    }

    //Валидация на дубль
    if (await repoTasks.existsBy({ title: bodyData.title, description: bodyData.description})) {
        return res.status(400).json({ message: 'Данная задача уже была созана ранее' });
    }
  
    const newTask: Task = await repoTasks.create(bodyData);
    await repoTasks.save(newTask);

    return res.sendStatus(201);   
  });
  
//Обновление задачи
router.put('/:id', async (req: RequestWithBodyAndParams<URIParamsTaskIdModel, Omit<Task, "id">>, res: Response) => {
    const id: number = parseInt(req.params.id);
    const bodyData: Omit<Task,"id">  = req.body;
   
    if (!await repoTasks.existsBy({ id: id})) {
        return res.status(404).json({ message: `Не найдена задача c id=${id}` });
    }

    if (bodyData.complexityLevel && ![ComplexityLevelTask.Easy, ComplexityLevelTask.Medium, ComplexityLevelTask.Hard].some(r => r === ComplexityLevelTask[bodyData.complexityLevel as keyof typeof ComplexityLevelTask])) {
        return res.status(400).json({ message: 'Изменение невозможно: задан несуществующий уровень сложности' });
    }

    await repoTasks.update(id, bodyData);
    res.status(200).json({ message: `Обновлена задача с ИД ${id}` }); 
});

  //Удаление задачи
router.delete('/:id', async (req: RequestWithParams<URIParamsTaskIdModel>, res: Response) => {    
    const id: number = parseInt(req.params.id);
    if (!await repoTasks.existsBy({ id: id})) {
        return res.status(404).json({ message: `Не найдена задача c id=${id}` });
    }
    await repoTasks.delete(id);
    res.status(201).json({ message: `Удалена задача с ИД ${id}` });
}); 

module.exports = router;