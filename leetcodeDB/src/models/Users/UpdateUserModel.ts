import { IsEmail } from "class-validator";

export type UpdateUserModel = {
    /** изменяемое имя */
    name: string;
    /** изменяемый пароль */
    password: string;    
    /** эл. почта */
    email?: string;
    /** изменяемая роль */
    role: 'Admin' | 'User' | 'Interviewer';
}