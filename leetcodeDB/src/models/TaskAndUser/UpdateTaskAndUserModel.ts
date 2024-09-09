export type UpdateTaskAndUserModel = {
    /** ИД пользователя */
    userid: number;
    /** Ид задачи */
    taskid: number;
    /** решение */
    decision?: string;
    /** процент выполнения */
    accertance?: number;
    /** решено или нет */
    isdone?: boolean;
}