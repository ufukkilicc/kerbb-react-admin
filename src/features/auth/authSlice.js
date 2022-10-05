import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authObject: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthObject: (state, { payload }) => {
      state.authObject = payload;
    },
  },
});
export const { updateAuthObject } = authSlice.actions;
export const getAuthObject = (state) => state.auth.authObject;

export default authSlice.reducer;
