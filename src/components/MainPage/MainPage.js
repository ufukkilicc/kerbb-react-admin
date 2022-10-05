import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTotal, getTotal } from "../../features/total/totalSlice";
import Widget from "../Widget/Widget";
import "./MainPage.scss";
import CircularProgressWithLabel from "@mui/material/CircularProgress";
import { fetchScrappers } from "../../features/scrappers/scrappersAPI";
import {
  addCompaniesInfo,
  getCompaniesInfo,
} from "../../features/companies/companiesSlice";
import {
  addScrappersInfo,
  getScrappersInfo,
} from "../../features/scrappers/scrappersSlice";
import { fetchTotal } from "../../features/total/totalAPI";
import { fetchCompanies } from "../../features/companies/companiesAPI";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const scrappersInfoResponse = await fetchScrappers({ success: true });
      const totalResponse = await fetchTotal();
      const companiesInfoResponse = await fetchCompanies({ state: "active" });
      dispatch(addCompaniesInfo(companiesInfoResponse.data[0]));
      dispatch(addScrappersInfo(scrappersInfoResponse.data[0]));
      dispatch(addTotal(totalResponse.data));
      // dispatch(addCompaniesInfo(scrapperInfoResponse.data));
      // const jobsResponse = await fetchJobs();
      // const companiesResponse = await fetchCompanies();
      // console.log(companiesResponse);
      // dispatch(addJobs(jobsResponse.data));
      // dispatch(addCompanies(companiesResponse.data));
    }
    fetchData();
  }, []);
  const scrappersInfo = useSelector(getScrappersInfo);
  const companiesInfo = useSelector(getCompaniesInfo);
  const totals = useSelector(getTotal);
  return (
    <div className="main-page-container">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="widget-container">
        <Widget type={"job"} key="job" />
        <Widget
          type={"company"}
          activeCompanies={companiesInfo ? companiesInfo.total : 0}
          key="company"
        />
        <Widget type={"news"} key="news" />
        <Widget
          type={"scrapper"}
          scrappersInfo={scrappersInfo}
          key="scrapper"
        />
      </div>
      <div className="featured-chart-container">
        <div className="featured-container">
          <div className="featured-header-container">
            <h4 className="featured-header">Scrappers Result</h4>
          </div>
          <div className="circular-progress-container">
            <CircularProgressWithLabel
              variant="determinate"
              value={
                scrappersInfo && totals
                  ? `${(scrappersInfo.total * 100) / totals["scrapper"]}`
                  : 0
              }
              color="primary"
              size="8rem"
            />
            <h2 className="circular-progress-percentage">
              {scrappersInfo && totals
                ? `${((scrappersInfo.total * 100) / totals["scrapper"]) | 0}%`
                : 0}
            </h2>
          </div>
          <div className="scrappers-header-container">
            <h3 className="scrappers-header">Scrappers success rate</h3>
          </div>
          <div className="scrappers-info-container">
            <div className="scrappers-succeed-container">
              <h4 className="scrappers-succeed-header">Succeed</h4>
              <h3 className="scrappers-succeed-count">
                {scrappersInfo ? `${scrappersInfo.total}` : 0}
              </h3>
            </div>
            <div className="scrappers-failed-container">
              <h4 className="scrappers-failed-header">Failed</h4>
              <h3 className="scrappers-failed-count">
                {scrappersInfo && totals
                  ? `${totals["scrapper"] - scrappersInfo.total}`
                  : 0}
              </h3>
            </div>
          </div>
          <div className="scrappers-info-second-container">
            <div className="scrappers-time-container">
              <h4 className="scrappers-time-header">Time(s)</h4>
              <h3 className="scrappers-time-count">
                {scrappersInfo
                  ? `${parseFloat(scrappersInfo.time_lasts).toFixed(1)}''`
                  : 0}
              </h3>
            </div>
          </div>
          <div className="scrappers-info-third-container">
            <div className="scrappers-info-third-header-container">
              <h4 className="scrappers-info-third-header">Jobs</h4>
            </div>
            <div className="scrappers-info-third-inner-container">
              <div className="scrappers-added-container">
                <h4 className="scrappers-added-header">/Added</h4>
                <h3 className="scrappers-added-count">
                  {scrappersInfo ? `${scrappersInfo.jobs_added}` : 0}
                </h3>
              </div>
              <div className="scrappers-found-container">
                <h4 className="scrappers-found-header">/Found</h4>
                <h3 className="scrappers-found-count">
                  {scrappersInfo ? `${scrappersInfo.jobs_found}` : 0}
                </h3>
              </div>
              <div className="scrappers-extracted-container">
                <h4 className="scrappers-extracted-header">/Extracted</h4>
                <h3 className="scrappers-extracted-count">
                  {scrappersInfo ? `${scrappersInfo.jobs_extracted}` : 0}
                </h3>
              </div>
            </div>
          </div>
          <div className="see-all-container">
            <Link to="/dashboard/scrappers">
              <h4 className="see-all">See all scrappers</h4>
            </Link>
          </div>
        </div>

        <div className="chart-container">chart</div>
      </div>
    </div>
  );
};

export default MainPage;
