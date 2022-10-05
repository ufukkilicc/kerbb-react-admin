import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  publishers: [],
  publishersPage: 1,
};

export const publishersSlice = createSlice({
  name: "publishers",
  initialState,
  reducers: {
    addPublishers: (state, { payload }) => {
      state.publishers = payload;
    },
    updatePublishersPage: (state, { payload }) => {
      state.publishersPage = payload;
    },
    deletePublisher: (state, { payload }) => {
      let newState = state.publishers.filter(
        (publisher) => publisher._id !== payload
      );
      state.publishers = newState;
    },
  },
});
export const { addPublishers, updatePublishersPage, deletePublisher } =
  publishersSlice.actions;
export const getAllPublishers = (state) => state.publishers.publishers;
export const getAllPublishersPage = (state) => state.publishers.publishersPage;

export default publishersSlice.reducer;
