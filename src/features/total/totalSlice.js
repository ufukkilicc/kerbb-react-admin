import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
};

export const totalSlice = createSlice({
  name: "totals",
  initialState,
  reducers: {
    addTotal: (state, { payload }) => {
      state.totals = payload;
    },
  },
});
export const { addTotal } = totalSlice.actions;
export const getTotal = (state) => state.totals.totals;

export default totalSlice.reducer;
