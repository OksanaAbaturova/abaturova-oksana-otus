import { ComplexityLevelTask } from "./ComplexityLevelTask";

export type CreateTaskModel = {
    /** название задачи */
    title: string;
    /** описание задачи */
    description: string;
    /** сопоставимые теги для поиска */
    tags?: string[];
    /** уровень сложности */
    complexityLevel: ComplexityLevelTask;//'Easy' | 'Medium' | 'Hard';
    /** вложения */
    //attachments?: any[];
}