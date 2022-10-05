import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  company: [],
  companiesInfo: {},
  companiesPage: 1,
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompanies: (state, { payload }) => {
      state.companies = payload;
    },
    addCompany: (state, { payload }) => {
      state.company = payload;
    },
    postCompanyObject: (state, { payload }) => {
      let companies = state.companies;
      companies.push(payload);
      state.companies = companies;
    },
    addCompaniesInfo: (state, { payload }) => {
      state.companiesInfo = payload;
    },
    updateCompany: (state, { payload }) => {
      let addedItem = state.companies.find(
        (company) => company._id === payload._id
      );
      if (addedItem) {
        let newState = state.companies.map((company) => {
          if (company._id === payload._id) {
            return Object.assign({}, addedItem, payload);
          }
          return company;
        });
        state.companies = newState;
      }
    },
    updateCompaniesPage: (state, { payload }) => {
      state.companiesPage = payload;
    },
    removeCompany: (state, { payload }) => {
      let newState = state.companies.filter(
        (company) => company._id !== payload
      );
      state.companies = newState;
    },
  },
});
export const {
  addCompanies,
  addCompany,
  postCompanyObject,
  addCompaniesInfo,
  updateCompany,
  updateCompaniesPage,
  removeCompany,
} = companiesSlice.actions;
export const getAllCompanies = (state) => state.companies.companies;
export const getOneCompany = (state) => state.companies.company;
export const getCompaniesInfo = (state) => state.companies.companiesInfo;
export const getCompaniesPage = (state) => state.companies.companiesPage;

export default companiesSlice.reducer;
