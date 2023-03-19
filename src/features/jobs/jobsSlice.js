import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  job: {},
  jobsPage: 1,
  jobSearchObject: {
    sort_by: "date",
    sort: "DESC",
    query_text: "",
  },
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJobs: (state, { payload }) => {
      state.jobs = payload;
    },
    addJob: (state, { payload }) => {
      state.job = payload;
    },
    updateJob: (state, { payload }) => {
      let addedItem = state.jobs.find((job) => job._id === payload._id);
      if (addedItem) {
        let newState = state.jobs.map((job) => {
          if (job._id === payload._id) {
            return Object.assign({}, addedItem, payload);
          }
          return job;
        });
        state.jobs = newState;
      }
    },
    removeJob: (state, { payload }) => {
      let newState = state.jobs.filter((job) => job._id !== payload);
      state.jobs = newState;
    },
    updateJobsPage: (state, { payload }) => {
      state.jobsPage = payload;
    },
    updateJobSearchObject: (state, { payload }) => {
      state.jobSearchObject = payload;
    },
  },
});
export const {
  addJobs,
  addJob,
  updateJob,
  removeJob,
  updateJobsPage,
  updateJobSearchObject,
} = jobsSlice.actions;
export const getAllJobs = (state) => state.jobs.jobs;
export const getOneJob = (state) => state.jobs.job;
export const getJobsPage = (state) => state.jobs.jobsPage;
export const getJobSearchObject = (state) => state.jobs.jobSearchObject;

export default jobsSlice.reducer;
