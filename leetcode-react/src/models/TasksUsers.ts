export type TasksUsers = {
    /** ИД */
    id: number,
    idUser: number,
    idTask: number,
    /**завершено */
    isFinished: boolean,
    /**принято */
    isAccepted: boolean,
    /**итоговый балл */
    finalScore?: number
}