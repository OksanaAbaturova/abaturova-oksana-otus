const express = require('express');
const router = express.Router();
//const { User } = require('../db/mongoose');

const users = [];
const app = express();
app.use(express.json());    //middleware for JsonData

//Просмотр всех пользователей
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Не найден указанный ИД пользователя' });
    }
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: 'Не найден пользователь' });
    }
    res.status(200).json(user);
});

//Создание пользователя
router.post('/', (req, res) => {
    const { name, password, role } = req.body;
    let dataRole = role ? role : 'user';
    if (!name || !password) {
      return res.status(400).json({ message: 'Не задано имя или пароль пользователя' });
    }
    //валидация на тип роли
    if (dataRole && !['admin', 'user', 'interviewer'].some(r => r === dataRole)) {
        return res.status(400).json({ message: 'Задана несуществующая роль' });
    }

    const newUser = {
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
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    if (!id) {
        res.status(400).json({ message: 'Не задан идентификатор пользователя' });
    }
    const currentUser = users.find((us) => us.id === parseInt(id));    
    if (!currentUser) {
        return res.status(404).json({ message: 'Не найден пользователь' });
    }
    if (role && !['admin', 'user', 'interviewer'].some(x => x === role)) {
        return res.status(400).json({ message: 'Изменение невозможно: задана несуществующая роль' });
    }
    let indexUser = users.indexOf(currentUser);
    for (const key of Object.keys(req.body)) {
        currentUser[key] = req.body[key];
    }    
    users.splice(indexUser, 1, currentUser);
    res.status(200).json(currentUser);
});



//Удаление пользователя
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({ message: 'Не задан идентификатор пользователя' });
    }
    const deleteUser = users. find(u => u.id === parseInt(id));
    if (!deleteUser) {
        return res.status(404).json({ message: 'Не найден пользователь' });
    }    
    let deleteIndex = users.indexOf(deleteUser);
    users.splice(deleteIndex, 1);

    res.status(201).json({ message: `Удален пользователь с ИД ${id}` });
});

module.exports = router;