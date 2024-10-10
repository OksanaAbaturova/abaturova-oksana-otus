import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { TasksUsers } from "../../models/TasksUsers";

const initialStateTU: TasksUsers[] = [
    {
      id: 1,
      idUser: 1,
      idTask: 1,
      isFinished: true,
      isAccepted: true,
      finalScore: 5
    },
    {
        id: 2,
        idUser: 1,
        idTask: 3,
        isFinished: true,
        isAccepted: false,
    },
    {
        id: 3,
        idUser: 1,
        idTask: 4,
        isFinished: true,
        isAccepted: true,
        finalScore: 3
    },
    {
        id: 4,
        idUser: 1,
        idTask: 2,
        isFinished: true,
        isAccepted: false,
    },
    {
        id: 5,
        idUser: 2,
        idTask: 1,
        isFinished: true,
        isAccepted: true,
        finalScore: 5
    },
];


const tasksUsersAdapter = createEntityAdapter({

  selectId: (tasksUser: TasksUsers) => tasksUser.id,
  sortComparer: (a, b) => a.idTask.toLocaleString().localeCompare(b.idTask.toLocaleString()),
});


export const taskUsersSlice = createSlice({
  name: 'users',
  initialState: tasksUsersAdapter.getInitialState(
      {
        loading: 'idle',
      },
      initialStateTU
  ),
  reducers: {
    addTaskUser: tasksUsersAdapter.addOne,
    setTaskUser: tasksUsersAdapter.setOne,
    updateTaskUser: tasksUsersAdapter.updateOne,    
  }
});

export const { addTaskUser, setTaskUser, updateTaskUser } = taskUsersSlice.actions;
export default taskUsersSlice.reducer;
