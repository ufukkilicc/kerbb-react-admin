import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import jobsReducer from "../features/jobs/jobsSlice";
import companiesReducer from "../features/companies/companiesSlice";
import newsReducer from "../features/news/newsSlice";
import totalReducer from "../features/total/totalSlice";
import scrappersReducer from "../features/scrappers/scrappersSlice";
import usersReducer from "../features/users/usersSlice";
import tagsReducer from "../features/tags/tagsSlice";
import rolesREducer from "../features/roles/rolesSlice";
import authReducer from "../features/auth/authSlice";
import publishersReducer from "../features/publishers/publishersSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    companies: companiesReducer,
    news: newsReducer,
    totals: totalReducer,
    scrappers: scrappersReducer,
    users: usersReducer,
    tags: tagsReducer,
    roles: rolesREducer,
    auth: authReducer,
    publishers: publishersReducer,
  },
});
