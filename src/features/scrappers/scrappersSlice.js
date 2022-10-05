import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scrappers: [],
  scrappersInfo: {},
  scrappersPage: 1,
};

export const scrappersSlice = createSlice({
  name: "scrappers",
  initialState,
  reducers: {
    addScrappers: (state, { payload }) => {
      state.scrappers = payload;
    },
    addScrappersInfo: (state, { payload }) => {
      state.scrappersInfo = payload;
    },
    updateScrappersPage: (state, { payload }) => {
      state.scrappersPage = payload;
    },
  },
});
export const { addScrappers, addScrappersInfo, updateScrappersPage } =
  scrappersSlice.actions;
export const getAllScrappers = (state) => state.scrappers.scrappers;
export const getScrappersInfo = (state) => state.scrappers.scrappersInfo;
export const getScrappersPage = (state) => state.scrappers.scrappersPage;

export default scrappersSlice.reducer;
