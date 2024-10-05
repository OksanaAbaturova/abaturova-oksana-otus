import { ComplexityLevelTask } from "./ComplexityLevelTask";

export interface Task {
    /** ИД задачи */
    id: number;
    /** наименование */
    title: string;
    /** описание */
    description: string;
    /** сопоставимые теги для поиска */
    tags?: string[];
    /** уровень сложности */
    complexityLevel: ComplexityLevelTask;
    /** вложения */
    attachments?: any[];
}