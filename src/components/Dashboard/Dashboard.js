import React, { useEffect } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";
import "./Dashboard.scss";
import { Routes, Route } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/jobs/jobsAPI";
import { fetchCompanies } from "../../features/companies/companiesAPI";
import { fetchTotal } from "../../features/total/totalAPI";
import { addJobs } from "../../features/jobs/jobsSlice";
import {
  addCompanies,
  getAllCompanies,
} from "../../features/companies/companiesSlice";
import { addTotal } from "../../features/total/totalSlice";
import ScrappersPage from "../ScrappersPage/ScrappersPage";
import UsersPage from "../UsersPage/UsersPage";
import UserAddPage from "../UserAddPage/UserAddPage";
import JobsPage from "../JobsPage/JobsPage";
import JobEditPage from "../JobEditPage/JobEditPage";
import CompaniesPage from "../CompaniesPage/CompaniesPage";
import NewsPage from "../NewsPage/NewsPage";
import NotFoundPage from "../NotFound/NotFoundPage";
import UserEditPage from "../UserEditPage/UserEditPage";
import NewsEditPage from "../NewsEditPage/NewsEditPage";
import CompanyEditPage from "../CompanyEditPage/CompanyEditPage";
import TagsPage from "../TagsPage/TagsPage";
import TagTypesPage from "../TagTypesPage/TagTypesPage";
import CompanyAddPage from "../CompanyAddPage/CompanyAddPage";
import NewsAddPage from "../NewsAddPage/NewsAddPage";
import ScrappersDetailPage from "../ScrappersDetailPage/ScrappersDetailPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import PublishersPage from "../PublishersPage/PublishersPage";
import PublishersEditPage from "../PublishersEditPage/PublishersEditPage";
import PublishersAddPage from "../PublishersAddPage/PublishersAddPage";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      // const jobsResponse = await fetchJobs();
      // const companiesResponse = await fetchCompanies();
      const totalResponse = await fetchTotal();
      // dispatch(addJobs(jobsResponse.data));
      // dispatch(addCompanies(companiesResponse.data));
      dispatch(addTotal(totalResponse.data));
    }
    fetchData();
  }, []);
  // const companies = useSelector(getAllCompanies);
  // (companies);
  return (
    <div className="dashboard-container">
      <div className="side-navbar-container">
        <SideNavbar />
      </div>
      <div className="dashboard-inner-container">
        <Navbar />
        <div className="dashboard-inner-inner-container">
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="lists/users" element={<UsersPage />} />
            <Route path="lists/users/:id/edit" element={<UserEditPage />} />
            <Route path="lists/users/add" element={<UserAddPage />} />
            <Route path="lists/jobs" element={<JobsPage />} />
            <Route path="lists/jobs/:id/edit" element={<JobEditPage />} />
            <Route path="lists/companies" element={<CompaniesPage />} />
            <Route
              path="lists/companies/:id/edit"
              element={<CompanyEditPage />}
            />
            <Route path="lists/companies/add" element={<CompanyAddPage />} />
            <Route path="lists/news" element={<NewsPage />} />
            <Route path="lists/news/:id/edit" element={<NewsEditPage />} />
            <Route path="lists/news/add" element={<NewsAddPage />} />
            <Route path="lists/scrappers" element={<ScrappersPage />} />
            <Route
              path="lists/scrappers/:id"
              element={<ScrappersDetailPage />}
            />
            <Route path="auth/profile/*" element={<ProfilePage />} />
            <Route path="features/publishers" element={<PublishersPage />} />
            <Route
              path="features/publishers/:id/edit"
              element={<PublishersEditPage />}
            />
            <Route
              path="features/publishers/add"
              element={<PublishersAddPage />}
            />
            <Route path="features/tags" element={<TagsPage />} />
            <Route path="features/tag-types" element={<TagTypesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
