


import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Task } from "../../../models/Task/Task";
import { createApi } from "@reduxjs/toolkit/query/react";


export const apiTaskSlice = createApi({
    reducerPath: 'api/tasks',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
    endpoints: builder => ({
      getTasks: builder.query<Task[], void>({
        query: () => '/tasks'
      }),
      getTask : builder.query<Task, string>({
        query: taskId => `tasks/${taskId}`
      })
    })
  });

  export const { useGetTasksQuery, useGetTaskQuery } = apiTaskSlice;