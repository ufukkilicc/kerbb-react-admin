import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRoles: (state, { payload }) => {
      state.roles = payload;
    },
  },
});
export const { addRoles } = rolesSlice.actions;
export const getAllRoles = (state) => state.roles.roles;

export default rolesSlice.reducer;
