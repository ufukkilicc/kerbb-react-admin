import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  usersPage: 1,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      state.users = payload;
    },
    updateUsersPage: (state, { payload }) => {
      state.usersPage = payload;
    },
    postUserObject: (state, { payload }) => {
      let users = state.users;
      users.push(payload);
      state.users = users;
    },
    deleteUser: (state, { payload }) => {
      let newState = state.users.filter((user) => user._id !== payload);
      state.users = newState;
    },
  },
});
export const { addUsers, updateUsersPage, postUserObject, deleteUser } =
  usersSlice.actions;
export const getAllUsers = (state) => state.users.users;
export const getUsersPage = (state) => state.users.usersPage;

export default usersSlice.reducer;
