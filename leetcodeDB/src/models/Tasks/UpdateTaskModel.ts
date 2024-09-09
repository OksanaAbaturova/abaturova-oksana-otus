export type UpdateTaskModel = {
    /** обновляемое назыание */
    title?: string;
    /** обновляемое описание задачи */
    description?: string;
    /** теги для поиска */
    tags?: string[];
    /** уровень сложности */
    complexityLevel: 'Easy' | 'Medium' | 'Hard';
    /** вложения */
    attachments?: any[];
}