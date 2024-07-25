import { ComplexityLevelTask } from "./src/models/Tasks/ComplexityLevelTask";
import { CreateTaskModel } from "./src/models/Tasks/CreateTaskModel";
import { CreateUserModel } from "./src/models/Users/CreateUserModel";
import { UpdateUserModel } from "./src/models/Users/UpdateUserModel";

const supertest = require("supertest");  
const {app} = require("./app");

//Testing Tasks
describe("Creating tests POST TASKS", () => {

    const oneTask: CreateTaskModel = { 
        title: 'First Task',
        description: '......', 
        tags: ['string'], 
        complexityLevel: 'Easy'
    };

    test("Создание новой задачи со всеми параметрами", async () => {
        const response = await supertest.agent(app).post("/task").send(oneTask);
        expect(response.statusCode).toBe(201);
    });

    test("Создание новой задачи без указания заголовка или описания", async () => {
        const response = await supertest.agent(app).post("/task").send({
            id: 10,         
            tags: 'string'
        });
        expect(response.statusCode).toBe(400);
    });

    test("Создание новой задачи без тела", async () => {
        const response = await supertest.agent(app).post("/task").send();
        expect(response.statusCode).toBe(400);
    });

    test("Создание новой задачи с указанием неверного уровня сложности", async () => {
        const response = await supertest.agent(app).post("/task").send({ 
            id: 1, 
            title: 'First Task',
            description: '......', 
            tags: ['string'], 
            complexityLevel: 'easyr',
            attachments : undefined,
        });
        expect(response.statusCode).toBe(400);
    });
});

describe("Creating tests GET TASKS", () => {
    test("Получение всех задач", async () => {
        const response = await supertest.agent(app).get("/task");
        expect(response.statusCode).toBe(200);
    });
    test("Получение конкретной задачи при ее наличии", async () => {
        const response = await supertest.agent(app).get("/task/1");
        expect(response.statusCode).toBe(200);
    });
    test("Получение конкретной задачи при ее отсутствии", async () => {
        const response = await supertest.agent(app).get("/task/100");
        expect(response.statusCode).toBe(404);
    });
});

describe("Creating tests PATCH TASKS", () => {
    test("Частичное изменение данных по задачам -  при ее наличии", async () => {
        const response = await supertest.agent(app).patch("/task/1").send({
            id: 1, 
            title: 'Last Task',
            other: '...'
        });
        expect(response.statusCode).toBe(200);
    });
    test("Частичное изменение данных по задачам - при ее отсутствии", async () => {
        const response = await supertest.agent(app).patch("/task/111").send({
            title: 'Second Task',
            other: '...'
        });
        expect(response.statusCode).toBe(404);
    });
    test("Частичное изменение данных по задачам - при наличии задачи, но с неверным уровнем сложности", async () => {
        const response = await supertest.agent(app).patch("/task/1").send({
            title: 'Other Task',
            complexityLevel: 'middle'
        });
        expect(response.statusCode).toBe(400);
    });
});

describe("Creating tests DELETE TASKS", () => {
    test("Удаление задачи при неуказании ее ИД", async () => {
        const response = await supertest.agent(app).delete("/task/");
        expect(response.statusCode).toBe(404);
    });
    test("Удаление несуществующей задачи", async () => {
        const response = await supertest.agent(app).delete("/task/111")
        expect(response.statusCode).toBe(404);
    });
    test("Удаление существующей задачи", async () => {
        const response = await supertest.agent(app).delete("/task/1")
        expect(response.statusCode).toBe(201);
    });
});

//Testing USERS
describe("Creating tests POST USERS", () => {

    const oneUser: CreateUserModel = { 
        name: 'Otus', 
        password: '123',
        role: 'Admin'
    };

    test("Создание нового пользователя - успех", async () => {
        const response = await supertest.agent(app).post("/user").send(oneUser);
        expect(response.statusCode).toBe(201);
    });

    test("Создание нового пользователя без указания пароля", async () => {
        const response = await supertest.agent(app).post("/user").send({
            id: 2,
            name: 'Oksana',
            role: 'user'
        });
        expect(response.statusCode).toBe(400);
    });

    test("Создание нового пользователя без указания имени", async () => {
        const response = await supertest.agent(app).post("/user").send({
            id: 2,
            password: '123',
            role: 'user'
        });
        expect(response.statusCode).toBe(400);
    });

    test("Создание нового пользователя без тела", async () => {
        const response = await supertest.agent(app).post("/user").send();
        expect(response.statusCode).toBe(400);
    });

    test("Создание нового пользователя с указанием неверной роли", async () => {
        const response = await supertest.agent(app).post("/user").send({ 
            id: 1, 
            name: 'Otus', 
            password: '123',
            role: 'other'
        });
        expect(response.statusCode).toBe(400);
    });
});

describe("Creating tests GET USERS", () => {
    test("Получение всех пользователей", async () => {
        const response = await supertest.agent(app).get("/user");
        expect(response.statusCode).toBe(200);
    });
    test("Получение конкретного пользователя при его наличии", async () => {
        const response = await supertest.agent(app).get("/user/1");
        expect(response.statusCode).toBe(200);
    });
    test("Получение конкретного пользователя при ее отсутствии", async () => {
        const response = await supertest.agent(app).get("/user/100");
        expect(response.statusCode).toBe(404);
    });
});

describe("Creating tests PATCH USERS", () => {
    test("Частичное изменение данных по пользователю - при его наличии", async () => {
        const response = await supertest.agent(app).patch("/user/1").send({id: 1, 
            name: 'Otus new',
            password: '987654321'
        });
        expect(response.statusCode).toBe(200);
    });
    test("Частичное изменение данных по пользователю - при его отсутствии", async () => {
        const response = await supertest.agent(app).patch("/user/111").send({id: 1, 
            name: 'other user',
            password: '1111'
        });
        expect(response.statusCode).toBe(404);
    });
    test("Частичное изменение данных по пользователю - при его наличии задачи, но с неверной ролью", async () => {
        const response = await supertest.agent(app).patch("/user/1").send({
            other: 'Other ..',
            role: 'otherUser'
        });
        expect(response.statusCode).toBe(400);
    });
    test("Частичное изменение данных по пользователю - при его наличии задачи, причем с верной ролью", async () => {
        const response = await supertest.agent(app).patch("/user/1").send({
            password: 'root',
            role: 'Admin'
        });
        expect(response.statusCode).toBe(200);
    });
});

describe("Creating tests DELETE USERS", () => {
    test("Удаление пользователя при неуказании его ИД", async () => {
        const response = await supertest.agent(app).delete("/user/");
        expect(response.statusCode).toBe(404);
    });
    test("Удаление несуществующего пользователя", async () => {
        const response = await supertest.agent(app).delete("/user/111")
        expect(response.statusCode).toBe(404);
    });
    test("Удаление существующего пользователя", async () => {
        const response = await supertest.agent(app).delete("/user/1")
        expect(response.statusCode).toBe(201);
    });
});