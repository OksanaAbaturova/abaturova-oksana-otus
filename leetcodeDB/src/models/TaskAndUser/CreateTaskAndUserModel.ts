export type CreateTaskAndUserModel = {
    /** ИД пользователя */
    userid: number;
    /** Ид задачи */
    taskid: number;
    /** решение */
    decision?: string;
}