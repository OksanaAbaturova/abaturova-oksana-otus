export type TasksUsers = {
    idUser: number,
    idTask: number,
    /**завершено */
    isFinished: boolean,
    /**принято */
    isAccepted: boolean,
    /**итоговый балл */
    finalScore?: number
}