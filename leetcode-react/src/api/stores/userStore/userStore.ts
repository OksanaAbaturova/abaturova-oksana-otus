/*import { createEntityAdapter, createSlice, current } from "@reduxjs/toolkit";
import { User } from "../../../models/User/User";



const usersAdapter = createEntityAdapter({
    selectId: (user: User) => user.id,
    sortComparer: (a, b) => (a.firstname ?? '').localeCompare(b.firstname ?? ''),
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addUser: usersAdapter.addOne,
    setUser: usersAdapter.setOne,

    log: (state, actions) => {
      const s = usersAdapter.getSelectors();
      console.log(1, current(s.selectIds(state)));
      console.log(2, s.selectAll(state));
      console.log(3, s.selectById(state, 1));
      console.log(4, current(s.selectEntities(state)));
      console.log(5, s.selectTotal(state));
      return state;
    },
  },
});
export const { addUser, setUser, log } = usersSlice.actions;
export default usersSlice.reducer;*/
