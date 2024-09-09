import {UserRoles} from './UserRoles';

export interface User {
    /**
     * Ид пользователя
     */
    id: number;
    /**
     * имя пользователя
     */
    name: string;
    /**
     * пароль
     */
    password: string;
    /**
     * текущая роль пользователя
     */
    role: UserRoles;
}