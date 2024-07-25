export type CreateUserModel = {
    /** имя */
    name: string;
    /** пароль */
    password: string;
    /** доступная роль (в строковом или числовом эквиваленте) */
    role: 'Admin' | 'User' | 'Interviewer';
}