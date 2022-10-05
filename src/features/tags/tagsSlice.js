import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTags: (state, { payload }) => {
      state.tags = payload;
    },
  },
});
export const { addTags } = tagsSlice.actions;
export const getAllTags = (state) => state.tags.tags;

export default tagsSlice.reducer;
