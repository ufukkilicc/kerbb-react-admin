import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  newsPage: 1,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNews: (state, { payload }) => {
      state.news = payload;
    },
    updateNewsPage: (state, { payload }) => {
      state.newsPage = payload;
    },
    updateOneNews: (state, { payload }) => {
      let addedItem = state.news.find((news) => news._id === payload._id);
      if (addedItem) {
        let newState = state.news.map((news) => {
          if (news._id === payload._id) {
            return Object.assign({}, addedItem, payload);
          }
          return news;
        });
        state.news = newState;
      }
    },
    postNewsObject: (state, { payload }) => {
      let news = state.news;
      news.push(payload);
      state.news = news;
    },
    deleteNews: (state, { payload }) => {
      let newState = state.news.filter((newsOne) => newsOne._id !== payload);
      state.news = newState;
    },
  },
});
export const {
  addNews,
  updateNewsPage,
  postNewsObject,
  updateOneNews,
  deleteNews,
} = newsSlice.actions;
export const getAllNews = (state) => state.news.news;
export const getNewsPage = (state) => state.news.newsPage;

export default newsSlice.reducer;
