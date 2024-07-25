export type CreateTaskModel = {
    /** название задачи */
    title: string;
    /** описание задачи */
    description: string;
    /** сопоставимые теги для поиска */
    tags?: string[];
    /** уровень сложности */
    complexityLevel: 'Easy' | 'Medium' | 'Hard';
    /** вложения */
    attachments?: any[];
}