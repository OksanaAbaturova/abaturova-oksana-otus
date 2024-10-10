import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User/User";

const initialStateUsers: User[] = [
  {
      id: 1,
      raiting: 2,
      email: 'ivan_ivanov@gmail.com',
      firstname: 'Иванов',
      lastname: 'Иван', 
      tasks: [
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
      ]
  },
  {
      id:2,
      raiting: 8,
      email: 'max_maximov@gmail.com',
      firstname: 'Максимов',
      lastname: 'Максим',
      tasks: [
        {
          id: 5,
          idUser: 2,
          idTask: 1,
          isFinished: true,
          isAccepted: true,
          finalScore: 5
        },
        {
          id: 6,
          idUser: 2,
          idTask: 2,
          isFinished: true,
          isAccepted: true,
          finalScore: 4
        },
        {
          id: 7,
          idUser: 2,
          idTask: 4,
          isFinished: true,
          isAccepted: false,
        },
      ]
  },
  {
    id:3,
    raiting: 6,
    email: 'olga@gmail.com',
    firstname: 'Олина',
    lastname: 'Ольга', 
    tasks: []
}   
];

const usersAdapter = createEntityAdapter({

  selectId: (user: User) => user.id,
  sortComparer: (a, b) => (a.firstname ?? '').localeCompare(b.firstname ?? ''),
});

export const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState(
        {
          loading: 'idle',
        },
        initialStateUsers
    ),
    reducers: {
      addUser: usersAdapter.addOne,
      setUser: usersAdapter.setOne,
      updateUser: usersAdapter.updateOne,
    }
  });

 export const { addUser, setUser, updateUser } = usersSlice.actions; 
export default usersSlice.reducer;
