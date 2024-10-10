/*import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from "../../../models/User/User";

export const apiUserSlice = createApi({
    reducerPath: 'apiUsers',
    baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
    endpoints: builder => ({
      getUsers: builder.query<User[], void>({
        query: () => '/users'
      }),
      getUser : builder.query<User, string>({
        query: userId => `users/${userId}`
      })
    })
  });
  
  export const { useGetUsersQuery, useGetUserQuery } = apiUserSlice;*/