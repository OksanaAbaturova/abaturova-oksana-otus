export type UpdateUserModel = {
    /** изменяемое имя */
    name: string;
    /** изменяемый пароль */
    password: string;
    /** изменяемая роль */
    role: 'Admin' | 'User' | 'Interviewer';
}