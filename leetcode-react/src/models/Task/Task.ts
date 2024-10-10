import { ComplexityLevelTask } from "./ComplexityLevelTask";
import { InputOutputParams } from "./InputOutputParams";

export interface Task {
    /** ИД задачи */
    id: number;
    /** наименование */
    title: string;
    /** описание */
    description: string;
    /** сопоставимые теги для поиска */
    tags?: string;
    /** уровень сложности */
    complexityLevel: ComplexityLevelTask;
    /**Входный и выходные параметры */
    ioParams?: InputOutputParams[];
    /** вложения */
    attachments?: any[];
}