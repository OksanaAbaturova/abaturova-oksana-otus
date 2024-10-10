import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import tasksUsersReducer from '../features/tasksUsers/tasksUsersSlice';


export const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
    tasksUsers: tasksUsersReducer
  },
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;