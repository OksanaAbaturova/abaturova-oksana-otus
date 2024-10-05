import { TasksUsers } from "../TasksUsers"

export type User = {
    id: number,
    email: string,
    firstname?: string
    lastname? : string,
    raiting: number,
    tasks?: TasksUsers[]
}