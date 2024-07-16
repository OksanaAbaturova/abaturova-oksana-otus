const express = require('express');
const router = express.Router();

const tasks = [];
const app = express();
app.use(express.json());    //middleware for JsonData

//Просмотр всех задач
router.get('/', (req, res) => {
    res.status(200).json(tasks);    
});

//Просмотр конткретной задачи
router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Не найден указанный ИД задачи' });
    }
    const one_task = tasks.find((task) => task.id === parseInt(id));
    if (!one_task) {
        return res.status(404).json({ message: 'Не найдена задача' });
    }
    res.status(200).json(one_task);
});

//Созание задачи
router.post('/', (req, res) => {
    const { title, description, tags, complexityLevel, attachments } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ message: 'Не задано название или описание задачи' });
    }
    if (complexityLevel && !['easy', 'medium', 'hard'].some(r => r === complexityLevel)) {
        return res.status(400).json({ message: 'Задан несуществующий уровень сложности' });
    }
  
    const newTask = { 
        id: tasks.length + 1, 
        title: title, 
        description: description, 
        tags: !tags ? new Array() : tags, 
        complexityLevel: complexityLevel ? complexityLevel : 'easy',   //по умолчанию присваивается легкий уровень сложности
        attachments : attachments ? attachments : [],
    };
    tasks.push(newTask);
  
    res.status(201).json(newTask);
  });

//Обновление задачи
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { complexityLevel } = req.body;
    if (!id) {
        res.status(400).json({ message: 'Не задан ИД задачи' });
    }
    const currentTask = tasks.find((t) => t.id === parseInt(id));    
    if (!currentTask) {
        return res.status(404).json({ message: 'Не найдена задача' });
    }
    if (complexityLevel && !['easy', 'medium', 'hard'].some(x => x === complexityLevel)){
        return res.status(400).json({ message: 'Изменение невозможно: задан несуществующий уровень сложности' });
    }
    let indexTask = tasks.indexOf(currentTask);
    for (const key of Object.keys(req.body)) {
        currentTask[key] = req.body[key];
    }    
    tasks.splice(indexTask, 1, currentTask);
    res.status(200).json(currentTask);
});

//Удаление задачи
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({ message: 'Не найден указанный ИД задачи' });
    }
    const deleteTask = tasks.find(t => t.id === parseInt(id));
    if (!deleteTask) {
        return res.status(404).json({ message: 'Не найдена задача' });
    }    
    let deleteIndex = tasks.indexOf(deleteTask);
    tasks.splice(deleteIndex, 1);

    res.status(201).json({ message: `Удалена задача с ИД ${id}` });
});

module.exports = router;